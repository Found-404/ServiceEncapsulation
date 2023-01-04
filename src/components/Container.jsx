import React from "react";
import { Element, useNode } from "@craftjs/core";
// import {Text} from './Text'

export const Container = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => connect(drag(ref))} className='container'>
      {children}
    </div>
  )
}
