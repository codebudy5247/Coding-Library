import React from 'react';
import { COMPONENT_REGISTRY } from './registry';
import type { SDUIComponent } from './types';

interface RendererProps {
    layout: SDUIComponent;
}

export const SDUIRenderer: React.FC<RendererProps> = ({ layout }) => {
    const Component = COMPONENT_REGISTRY[layout.type];

    if (!Component) {
        console.warn(`Component type "${layout.type}" not found in registry.`);
        return null;
    }

    // If the component has children, recursively render them
    const children = layout.children?.map((child) => (
        <SDUIRenderer key={child.id} layout={child} />
    ));

    return (
        <Component {...layout.props} key={layout.id}>
            {children}
        </Component>
    );
};
