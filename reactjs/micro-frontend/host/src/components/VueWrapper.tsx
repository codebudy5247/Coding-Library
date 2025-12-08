import { useEffect, useRef } from 'react';

interface VueWrapperProps {
    component: any;
}

const VueWrapper: React.FC<VueWrapperProps> = ({ component }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const vueAppRef = useRef<any>(null);

    useEffect(() => {
        if (containerRef.current && component && !vueAppRef.current) {
            // Dynamically import Vue
            import('vue').then(({ createApp, defineCustomElement }) => {
                try {
                    // Create custom element from Vue component
                    const CustomElement = defineCustomElement(component);
                    customElements.define('vue-notifications-app', CustomElement);

                    // Create the custom element
                    const el = document.createElement('vue-notifications-app');
                    containerRef.current?.appendChild(el);

                    vueAppRef.current = el;
                } catch (error) {
                    console.error('Error mounting Vue component:', error);
                }
            });
        }

        return () => {
            // Cleanup
            if (containerRef.current && vueAppRef.current) {
                containerRef.current.removeChild(vueAppRef.current);
                vueAppRef.current = null;
            }
        };
    }, [component]);

    return <div ref={containerRef} />;
};

export default VueWrapper;
