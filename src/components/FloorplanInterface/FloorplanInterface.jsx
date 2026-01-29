import React, { useState } from 'react';
import { Menu, Button, Tooltip } from 'antd';
import {
  ProjectOutlined,
  ToolOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  PlusOutlined,
  MinusOutlined,
  ReloadOutlined,
  HomeOutlined,
  FontSizeOutlined,
  SignatureOutlined,
  UploadOutlined,
  BorderOutlined,
  DatabaseOutlined,
  BlockOutlined,
  BuildOutlined,
  RightOutlined,
  LeftOutlined,
  SaveOutlined,
  AppstoreOutlined,
  EditOutlined,
  ScissorOutlined,
  ColumnWidthOutlined,
} from '@ant-design/icons';

const objectsData = {
  'colocar-puertas': [
    {
      name: 'Puerta Sencilla',
      category: 'Door',
      label: 'D1',
      figure: 'Rectangle',
      width: 0.5,
      height: 0.05,
      fill: '#8B4513',
      stroke: '#555',
      strokeWidth: 1,
    },
    {
      name: 'Puerta Doble',
      category: 'Door',
      label: 'D2',
      figure: 'Rectangle',
      width: 1,
      height: 0.05,
      fill: '#8B4513',
      stroke: '#555',
      strokeWidth: 1,
    },
  ],
  'colocar-ventanas': [
    {
      name: 'Ventana Fija',
      category: 'Window',
      label: 'W1',
      figure: 'Rectangle',
      width: 0.8,
      height: 0.05,
      fill: '#ADD8E6',
      stroke: '#333',
      strokeWidth: 1,
    },
    {
      name: 'Ventana Corrediza',
      category: 'Window',
      label: 'W2',
      figure: 'Rectangle',
      width: 1.2,
      height: 0.05,
      fill: '#ADD8E6',
      stroke: '#333',
      strokeWidth: 1,
    },
  ],
  salon: [
    {
      name: 'Sofá',
      category: 'Furniture',
      label: 'S',
      symbol: '🛋️',
      width: 1.5,
      height: 0.8,
      color: '#A0522D',
      textColor: 'white',
    },
    {
      name: 'Mesa de Centro',
      category: 'Furniture',
      label: 'T',
      symbol: '☕',
      width: 0.8,
      height: 0.5,
      color: '#D2B48C',
      textColor: '#333',
    },
  ],
};

const panelTitles = {
  'colocar-puertas': 'Puertas',
  'colocar-ventanas': 'Ventanas',
  'tipo-habitacion': 'Tipos de Habitación',
  'colocar-etiqueta': 'Etiquetas',
  'signos-simbolos': 'Símbolos',
  salon: 'Objetos - Salón',
  dormitorio: 'Objetos - Dormitorio',
  cocina: 'Objetos - Cocina',
  bano: 'Objetos - Baño',
  comedor: 'Objetos - Comedor',
  oficina: 'Objetos - Oficina',
  decoracion: 'Objetos - Decoración',
  cortes: 'Dimensión - Cortes',
  medidas: 'Dimensión - Medidas',
  lineas: 'Dimensión - Líneas',
};

const ObjectsSubPanel = ({ type, onBack }) => {
  const objects = objectsData[type] || [];

  const handleDragStart = (evt, obj) => {
    const diagram = window.floorplanDiagram;
    if (!diagram) return;

    const draggedNode = {
      category: obj.category,
      name: obj.name,
      label: obj.label || obj.name,
      text: obj.text,
      symbol: obj.symbol,
      width: obj.width,
      height: obj.height,
      color: obj.color,
      strokeColor: obj.strokeColor,
      textColor: obj.textColor,
      figure: obj.figure,
      fill: obj.fill,
      stroke: obj.stroke,
      strokeWidth: obj.strokeWidth,
      arcWidth: obj.arcWidth,
      arcHeight: obj.arcHeight,
      showArc: obj.showArc,
      angle: 0,
    };

    evt.dataTransfer.effectAllowed = 'copy';
    evt.dataTransfer.setData('text', JSON.stringify(draggedNode));
  };

  return (
    <div className='fixed top-0 left-24 w-72 h-full bg-white shadow-xl z-20 transition-transform duration-300 ease-in-out p-4 rounded-lg'>
      <div className='flex items-center mb-4 pb-2 border-b border-gray-200'>
        <Button
          type='text'
          icon={<LeftOutlined />}
          onClick={onBack}
          className='text-gray-600 hover:text-blue-500'
        />
        <h3 className='text-lg font-semibold ml-2 text-gray-800'>
          {panelTitles[type] || 'Objetos'}
        </h3>
      </div>
      <div className='grid grid-cols-2 gap-4 overflow-y-auto h-[calc(100vh-6rem)]'>
        {objects.map((obj, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center p-2 rounded-lg border border-gray-300 bg-gray-50 cursor-grab hover:bg-gray-100 transition-colors shadow-sm'
            draggable
            onDragStart={(evt) => handleDragStart(evt, obj)}
          >
            <div
              className='w-12 h-12 rounded-md flex items-center justify-center font-bold border-2 shadow-inner'
              style={{
                backgroundColor: obj.color || '#D2691E',
                color: obj.textColor || 'white',
                fontSize: obj.symbol || obj.preview ? '24px' : '10px',
                borderColor: obj.strokeColor || '#333',
              }}
            >
              {obj.preview || obj.symbol || obj.label || obj.name}
            </div>
            <span className='text-xs mt-1 text-center font-medium text-gray-700'>
              {obj.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SidePanel = ({ type, onItemClick, onSave, onNew, onOpen }) => {
  const panelContent = {
    project: {
      title: 'Proyecto',
      items: [
        { icon: <HomeOutlined />, label: 'Nuevo Proyecto', hasArrow: false, action: 'nuevo-proyecto', onClick: onNew },
        { icon: <UploadOutlined />, label: 'Abrir Proyecto', hasArrow: false, action: 'abrir-proyecto', onClick: onOpen },
        { icon: <SaveOutlined />, label: 'Guardar Proyecto', hasArrow: false, action: 'guardar-proyecto', onClick: onSave },
      ],
    },
    build: {
      title: 'Construcción',
      items: [
        { icon: <BorderOutlined />, label: 'Dibujar Pared', hasArrow: true, action: 'dibujar-pared' },
        { icon: <DatabaseOutlined />, label: 'Colocar Puertas', hasArrow: true, action: 'colocar-puertas' },
        { icon: <BlockOutlined />, label: 'Colocar Ventanas', hasArrow: true, action: 'colocar-ventanas' },
      ],
    },
    info: {
      title: 'Información',
      items: [
        { icon: <HomeOutlined />, label: 'Tipo de Habitación', hasArrow: true, action: 'tipo-habitacion' },
        { icon: <FontSizeOutlined />, label: 'Colocar Etiqueta', hasArrow: true, action: 'colocar-etiqueta' },
        { icon: <SignatureOutlined />, label: 'Signos y Símbolos', hasArrow: true, action: 'signos-simbolos' },
      ],
    },
    objects: {
      title: 'Objetos',
      items: [
        { icon: <AppstoreOutlined />, label: 'Salón', hasArrow: true, action: 'salon' },
        { icon: <HomeOutlined />, label: 'Dormitorio', hasArrow: true, action: 'dormitorio' },
        { icon: <BuildOutlined />, label: 'Cocina', hasArrow: true, action: 'cocina' },
        { icon: <DatabaseOutlined />, label: 'Baño', hasArrow: true, action: 'bano' },
        { icon: <AppstoreOutlined />, label: 'Comedor', hasArrow: true, action: 'comedor' },
        { icon: <EditOutlined />, label: 'Oficina', hasArrow: true, action: 'oficina' },
        { icon: <HomeOutlined />, label: 'Decoración', hasArrow: true, action: 'decoracion' },
      ],
    },
    dimension: {
      title: 'Dimensión',
      items: [
        { icon: <ScissorOutlined />, label: 'Cortes', hasArrow: true, action: 'cortes' },
        { icon: <ColumnWidthOutlined />, label: 'Medidas', hasArrow: true, action: 'medidas' },
        { icon: <BorderOutlined />, label: 'Líneas', hasArrow: true, action: 'lineas' },
      ],
    },
    profile: {
      title: 'Perfil',
      items: [],
    },
    report: {
      title: 'Reporte',
      items: [],
    },
  };

  const content = panelContent[type];

  return (
    <div className='fixed top-0 left-24 w-72 h-full bg-white shadow-xl z-20 transition-transform duration-300 ease-in-out p-4 rounded-lg'>
      <div className='mb-4 pb-2 border-b border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-800'>{content.title}</h3>
      </div>
      <div className='overflow-y-auto h-[calc(100vh-4rem)]'>
        {content.items.map((item, index) => (
          <div
            key={index}
            className='flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors my-1'
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else if (onItemClick) {
                onItemClick(item.action);
              }
            }}
          >
            <div className='flex items-center space-x-3'>
              <span className='text-lg text-blue-600'>{item.icon}</span>
              <span className='text-sm font-medium text-gray-700'>
                {item.label}
              </span>
            </div>
            {item.hasArrow && (
              <RightOutlined className='text-sm text-gray-400' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FloatingVerticalSider = ({ onMenuClick, selectedKey }) => {
  const siderItems = [
    { key: 'project', icon: <ProjectOutlined />, label: 'Proyecto' },
    { key: 'build', icon: <ToolOutlined />, label: 'Construir' },
    { key: 'info', icon: <InfoCircleOutlined />, label: 'Info' },
    { key: 'objects', icon: <ApartmentOutlined />, label: 'Objetos' },
    { key: 'dimension', icon: <ColumnWidthOutlined />, label: 'Dimensión' },
  ];

  const items = siderItems.map((item) => ({
    key: item.key,
    icon: null,
    label: (
      <div className='flex flex-col items-center justify-center p-1'>
        <div className='text-xl mb-1'>{item.icon}</div>
        <div className='text-xs font-medium'>{item.label}</div>
      </div>
    ),
    className: 'h-20 flex flex-col items-center justify-center',
  }));

  return (
    <div className='fixed top-0 left-0 h-full w-24 bg-gray-800 text-white shadow-2xl z-30 flex flex-col items-center py-4 rounded-r-lg'>
      <Menu
        mode='vertical'
        selectedKeys={selectedKey ? [selectedKey] : []}
        items={items}
        className='bg-gray-800 border-none w-full'
        onClick={onMenuClick}
      />
    </div>
  );
};

const ZoomWindow = ({ isPanelOpen, onZoomIn, onZoomOut, onResetZoom }) => (
  <div
    className='fixed bottom-4 bg-white shadow-xl rounded-full p-2 flex space-x-2 z-10 border border-gray-200'
    style={{
      left: isPanelOpen ? '370px' : '110px',
      transition: 'left 0.3s ease',
    }}
  >
    <Tooltip title='Zoom In'>
      <Button
        icon={<PlusOutlined />}
        className='rounded-full shadow-md'
        onClick={onZoomIn}
      />
    </Tooltip>
    <Tooltip title='Zoom Out'>
      <Button
        icon={<MinusOutlined />}
        className='rounded-full shadow-md'
        onClick={onZoomOut}
      />
    </Tooltip>
    <Tooltip title='Reset Zoom'>
      <Button
        icon={<ReloadOutlined />}
        className='rounded-full shadow-md'
        onClick={onResetZoom}
      />
    </Tooltip>
  </div>
);

const FloorplanInterface = ({
  zoom,
  onZoomChange,
  onSave,
  onNew,
  onOpen,
}) => {
  const [selectedKey, setSelectedKey] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [subPanelType, setSubPanelType] = useState(null);

  const handleZoomIn = () => onZoomChange((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => onZoomChange((prev) => Math.max(prev - 0.1, 0.3));
  const handleResetZoom = () => onZoomChange(1);

  const handleMenuClick = (evt) => {
    if (selectedKey === evt.key) {
      setSelectedKey(null);
      setIsPanelOpen(false);
      setSubPanelType(null);
    } else {
      setSelectedKey(evt.key);
      setIsPanelOpen(true);
      setSubPanelType(null);
    }
  };

  const handlePanelItemClick = (action) => {
    setSubPanelType(action);
  };

  const handleBackToMainPanel = () => {
    setSubPanelType(null);
  };

  const isSubPanelOpen = subPanelType !== null;

  return (
    <>
      <FloatingVerticalSider
        onMenuClick={handleMenuClick}
        selectedKey={selectedKey}
      />

      {isPanelOpen && !isSubPanelOpen && (
        <SidePanel
          type={selectedKey}
          onItemClick={handlePanelItemClick}
          onSave={onSave}
          onNew={onNew}
          onOpen={onOpen}
        />
      )}

      {isSubPanelOpen && (
        <ObjectsSubPanel
          type={subPanelType}
          onBack={handleBackToMainPanel}
        />
      )}

      <ZoomWindow
        isPanelOpen={isPanelOpen}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
      />
    </>
  );
};

export default FloorplanInterface;