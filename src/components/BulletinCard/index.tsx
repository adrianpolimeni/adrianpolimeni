import React, { ReactElement, useEffect, useState } from "react";
import Fade from '@material-ui/core/Fade';

export const BulletinCard = (
  isExpanded : boolean,
  smallView: any,
  largeView: any
): ReactElement => {
  return(
    <>
    <Fade in={!isExpanded}>
      {smallView}
    </Fade>
    <Fade in={isExpanded}>
      {largeView}
    </Fade>
    </>
  );
}
export default BulletinCard;
