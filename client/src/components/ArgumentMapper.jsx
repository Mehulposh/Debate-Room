import React, { useEffect, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import ArgumentNode from "./ArgumentNode";
import { AlertTriangle } from 'lucide-react';


const nodeTypes = {
  argumentNode: ArgumentNode
};

const ArgumentMapper = ({ arguments: args }) => {
  const initialNodes = useMemo(() => {
  if (!args.length) return [];

  // Build map of children
  const childrenMap = {};
  args.forEach(arg => {
    if (!childrenMap[arg.parentId || 'root']) {
      childrenMap[arg.parentId || 'root'] = [];
    }
    childrenMap[arg.parentId || 'root'].push(arg);
  });

  const nodes = [];
  const levelSpacingY = 200;
  const siblingSpacingX = 300;

  //Recursively Assign Positions
  const traverse = (parentId = 'root', depth = 0, offsetX = 0) => {
    const children = childrenMap[parentId] || [];

    children.forEach((child, index) => {
      const x = offsetX + index * siblingSpacingX;
      const y = depth * levelSpacingY;

      nodes.push({
        id: child.id,
        type: 'argumentNode',
        data: {
          speakerName: child.speakerName,
          content: child.content,
          type: child.type,
        },
        position: { x, y },
        
      });

      traverse(child.id, depth + 1, x);
    });
  };

  traverse();

  return nodes;
}, [args]); 

  const initialEdges = useMemo(() => {
    return args
      .filter(arg => arg.parentId)
      .map(arg => ({
        id: `e-${arg.parentId}-${arg.id}`,
        source: arg.parentId,
        target: arg.id,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: arg.type === 'rebuttal' ? '#dc3545' : '#667eea',
          strokeWidth: 2
        }
      }));
  }, [args]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes,setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges,setEdges]);

  return (
    <div  className='rounded-xl bg-white h-160' >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            const arg = args.find(a => a.id === node.id);
            return arg?.fallacies?.length > 0 ? '#ffc107' : '#667eea';
          }}
        />
      </ReactFlow>
      
      {args.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#999'
        }}>
          <p style={{ fontSize: '18px' }}>No arguments yet</p>
          <p style={{ fontSize: '14px' }}>Start the debate to add arguments</p>
        </div>
      )}
    </div>
  );
};

export default ArgumentMapper;