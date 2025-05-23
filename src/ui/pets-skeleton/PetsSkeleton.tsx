import styles from './PetsSkeleton.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Card from '../card/Card';

type Props = {
  type:
    | 'dashboard'
    | 'abstract'
    | 'generic'
    | 'dashboardWithPagination'
    | 'contractsMyTasks'
    | ''; // List and define the neccessary types
};

const reviewSkeleton = (
  <Card customClass={styles.card} className="margin-y-3">
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={30}
      className="margin-bottom-2"
    />
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={20}
      className="margin-bottom-1"
    />
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={20}
      className="margin-bottom-1"
    />
    <div className="grid-row margin-top-2">
      {[true, true, true].map((it, idx) => (
        <div className="grid-col-3" key={idx}>
          <Skeleton
            variant="rounded"
            width={'80%'}
            height={10}
            className="margin-bottom-1"
          />
          <Skeleton
            variant="rounded"
            width={'80%'}
            height={10}
            className="margin-bottom-1"
          />
          <Skeleton
            variant="rounded"
            width={'80%'}
            height={10}
            className="margin-bottom-1"
          />
        </div>
      ))}
    </div>
  </Card>
);

const abstractSkeleton = (
  <>
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={30}
      className="margin-bottom-2"
    />
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={20}
      className="margin-bottom-1"
    />
    <Skeleton
      variant="rounded"
      width={'100%'}
      height={20}
      className="margin-bottom-1"
    />
  </>
);

const contractsMyTasksSkeleton = (
  <>
    <Skeleton
      variant="rounded"
      width={'50%'}
      height={15}
      className="margin-bottom-1"
    />
    <Skeleton
      variant="rounded"
      width={'60%'}
      height={15}
      className="margin-bottom-2"
    />
    <Skeleton
      variant="rounded"
      width={'50%'}
      height={15}
      className="margin-bottom-1"
    />
    <Skeleton
      variant="rounded"
      width={'60%'}
      height={15}
      className="margin-bottom-1"
    />
  </>
);

const genericSkeleton = (
  <>
    {['80%', '45%', '80%', '55%', '45%'].map((val) => (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton
            variant="rounded"
            width={val}
            height={25}
            className="margin-bottom-1"
          />
          <Skeleton
            variant="rounded"
            width={'2%'}
            height={10}
            className="margin-bottom-1 margin-top-2"
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Skeleton
            variant="rounded"
            width={'30%'}
            height={25}
            className="margin-bottom-2"
          />
          <Skeleton
            variant="rounded"
            width={'30%'}
            height={25}
            className="margin-bottom-2 margin-left-1"
          />
        </div>
      </>
    ))}
  </>
);

const dashboardWithPagination = (
  <>
    <div className="width-full display-flex flex-justify">
      <div>
        <Skeleton
          className="margin-bottom-2"
          variant="rounded"
          width={200}
          height={30}
        />
        <div className="display-flex flex-justify-start">
          <Skeleton
            variant="rounded"
            width={30}
            height={30}
            className="margin-right-2"
          />
          <Skeleton
            variant="rounded"
            width={30}
            height={30}
            className="margin-right-2"
          />
          <Skeleton
            variant="rounded"
            width={30}
            height={30}
            className="margin-right-2"
          />
          <Skeleton
            variant="rounded"
            width={30}
            height={30}
            className="margin-right-2"
          />
          <Skeleton
            variant="rounded"
            width={30}
            height={30}
            className="margin-right-2"
          />
        </div>
      </div>
      <div>
        <Skeleton
          className="margin-bottom-2"
          variant="rounded"
          width={110}
          height={30}
        />
        <Skeleton variant="rounded" width={100} height={30} />
      </div>
    </div>
    {[true, true, true].map((itm, indx) => (
      <Card customClass={styles.card} className="margin-y-3" key={indx}>
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={30}
          className="margin-bottom-2"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={20}
          className="margin-bottom-1"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={20}
          className="margin-bottom-1"
        />
        <div className="grid-row margin-top-2">
          {[true, true, true].map((it, idx) => (
            <div className="grid-col-3" key={idx}>
              <Skeleton
                variant="rounded"
                width={'80%'}
                height={10}
                className="margin-bottom-1"
              />
              <Skeleton
                variant="rounded"
                width={'80%'}
                height={10}
                className="margin-bottom-1"
              />
              <Skeleton
                variant="rounded"
                width={'80%'}
                height={10}
                className="margin-bottom-1"
              />
            </div>
          ))}
        </div>
      </Card>
    ))}
  </>
);

function PetsSkeleton({ type }: Props) {
  const renderContent = () => {
    switch (type) {
      case 'dashboard':
        return (
          <>
            {[true, true, true].map((it, idx) => (
              <div key={idx}>{reviewSkeleton}</div>
            ))}
          </>
        );
      case 'dashboardWithPagination':
        return <>{dashboardWithPagination}</>;
      case 'contractsMyTasks':
        return <>{contractsMyTasksSkeleton}</>;
      case 'abstract':
        return (
          <>
            {[true].map((it, idx) => (
              <div key={idx}>{abstractSkeleton}</div>
            ))}
          </>
        );
      case 'generic':
        return (
          <>
            {[true].map((it, idx) => (
              <div key={idx}>{genericSkeleton}</div>
            ))}
          </>
        );
      default:
        return <></>;
    }
  };
  return <>{renderContent()}</>;
}

export default PetsSkeleton;
