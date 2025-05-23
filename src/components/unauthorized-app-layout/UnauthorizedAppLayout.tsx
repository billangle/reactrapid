import React, { useState } from 'react';
import classes from './UnauthorizedAppLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { FOOTER_CONTACT_TYPE } from '../../types/enums';
import Footer from '../footer/Footer';
function UnauthorizedAppLayout() {
  const [contactType] = useState<FOOTER_CONTACT_TYPE>(
    FOOTER_CONTACT_TYPE.contactRei,
  );

  return (
    <>
      <div className={classes['layout-container']}>
        <div>
          <Outlet />
        </div>
        <Footer contactType={contactType} />
      </div>
    </>
  );
}

export default UnauthorizedAppLayout;
