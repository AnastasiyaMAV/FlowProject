import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizerInputNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 10 }}>{data.label}</div>
    </>
  );
};

export default memo(ResizerInputNode);
