import { useEffect, useRef } from 'react';

interface AngularWrapperProps {
    moduleName: string;
}

const AngularWrapper: React.FC<AngularWrapperProps> = ({ moduleName }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        if (containerRef.current && !mountedRef.current) {
            mountedRef.current = true;

            // Dynamically load Angular module
            import('settings/SettingsModule')
                .then((module: any) => {
                    // Angular module will be bootstrapped
                    // Create a placeholder element for Angular to mount
                    const element = document.createElement('app-settings');
                    containerRef.current?.appendChild(element);

                    // Load Angular's platform browser and bootstrap
                    import('@angular/platform-browser-dynamic').then(({ platformBrowserDynamic }) => {
                        platformBrowserDynamic()
                            .bootstrapModule(module.SettingsModule)
                            .catch((err: any) => console.error('Error loading Angular module:', err));
                    });
                })
                .catch((err) => console.error('Failed to load settings module:', err));
        }
    }, [moduleName]);

    return <div ref={containerRef} />;
};

export default AngularWrapper;
