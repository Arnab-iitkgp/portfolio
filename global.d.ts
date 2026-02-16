// Global type declarations for external libraries

declare global {
    interface Window {
        Prism: {
            highlightAll: () => void;
            highlightElement: (element: Element) => void;
        };
        mermaid: {
            initialize: (config: any) => void;
            run: (config?: { nodes?: HTMLElement[] }) => Promise<void>;
        };
    }
}

export { };
