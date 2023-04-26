
import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import FullKitRediness from "./FullKitRediness.js";

const Example =()=>{

return   <ParentSize>{({ width, height }) => <FullKitRediness width={1200} height={550} />}</ParentSize>;

}

export default Example;