export interface SDUIComponent {
    id: string;
    type: string;
    props?: Record<string, any>;
    children?: SDUIComponent[];
}
