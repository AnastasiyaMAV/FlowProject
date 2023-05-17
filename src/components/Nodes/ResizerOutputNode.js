import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizerOutputNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default memo(ResizerOutputNode);
