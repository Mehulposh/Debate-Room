import React, { useEffect, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AlertTriangle } from 'lucide-react';

const ArgumentMapper = ({ arguments: args }) => {
  const initialNodes = useMemo(() => {
    return args.map((arg, index) => ({
      id: arg.id,
      type: 'default',
      data: { 
        label: (
          <div style={{ padding: '10px', minWidth: '200px' }}>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: 'bold', 
              color: '#667eea',
              marginBottom: '5px'
            }}>
              {arg.speakerName}
            </div>
            <div style={{ fontSize: '13px', marginBottom: '8px' }}>
              {arg.content}
            </div>
            <div style={{ 
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'bold',
              background: arg.type === 'claim' ? '#e3f2fd' : 
                         arg.type === 'evidence' ? '#e8f5e9' :
                         arg.type === 'rebuttal' ? '#fff3e0' : '#fce4ec',
              color: arg.type === 'claim' ? '#1976d2' : 
                     arg.type === 'evidence' ? '#388e3c' :
                     arg.type === 'rebuttal' ? '#f57c00' : '#c2185b'
            }}>
              {arg.type}
            </div>
            
          </div>
        )
      },
      position: arg.position || { 
        x: 100 + (index % 3) * 300, 
        y: 100 + Math.floor(index / 3) * 200 
      },
      style: {
        background: 'white',
        border: arg.fallacies && arg.fallacies.length > 0 
          ? '2px solid #ffc107' 
          : '2px solid #667eea',
        borderRadius: '8px',
        padding: 0,
        width: 'auto'
      }
    }));
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
  }, [initialNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges]);

  return (
    <div style={{ height: '600px', background: '#f8f9fa', borderRadius: '8px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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