import { Children, isValidElement, useEffect, useState } from 'react';
import Header, { HeaderProps } from './Header';
import Content, { ContentProps } from './Content';

interface AccordionProps {
  children: React.ReactNode;
  onToggleItem?: (index: number, isExpand: boolean, flags: boolean[]) => void;
  doExpandItself?: boolean; // use if the items are static
}

const Accordion: React.FC<AccordionProps> & {
  Header: React.FC<HeaderProps>;
  Content: React.FC<ContentProps>;
} = (props: AccordionProps) => {
  const { children, onToggleItem, doExpandItself = true } = props;
  const [expandFlags, setExpandFlags] = useState<boolean[]>([]);

  useEffect(() => {
    const childAry = Children.toArray(children);
    setExpandFlags(childAry.map(() => false));
  }, [children]);

  const toggleAccordion = (index: number) => {
    const newFlags = expandFlags.map((f, idx) => (index === idx ? !f : f));
    setExpandFlags(newFlags);
    if (onToggleItem) onToggleItem(index, newFlags[index], newFlags);
  };

  return (
    <div className="usa-accordion">
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const panelId = `item-${index + 1}`;
          return (
            <div key={index} className="usa-accordion__item margin-bottom-3">
              <div className="usa-accordion__heading">
                <button
                  type="button"
                  className="usa-accordion__button"
                  aria-expanded={
                    doExpandItself
                      ? expandFlags[index]
                      : !!child.props.children[0].props.isExpand
                  }
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(index)}
                >
                  {child.props.children[0]}
                </button>
              </div>
              {((doExpandItself && expandFlags[index]) ||
                (!doExpandItself &&
                  !!child.props.children[0].props.isExpand)) && (
                <div
                  id={panelId}
                  style={{ padding: '1.25rem 2.8125rem' }}
                  className={`usa-accordion__content usa-prose usa-accordion__content--expanded`}
                >
                  {child.props.children[1]}
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
