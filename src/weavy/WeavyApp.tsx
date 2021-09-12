import { Component } from "react";

import WeavyContext from "./WeavyContext";
import "./weavy.css";

interface Props {
    spaceKey: string | null;
    spaceName: string | null;
    appKey: string | null;
    appType: string | null;
    appName: string | null;
}
interface State {}

export default class WeavyApp extends Component<Props, State> {
    static contextType = WeavyContext;
    public weavy: any;
    public weavySpace: any;
    public weavyApp: any;
    public el: HTMLDivElement | null = null;

    async createWeavyApp() {
        this.weavySpace = this.weavy.space({
            key: this.props.spaceKey,
            name: this.props.spaceName,
        });

        this.weavyApp = this.weavySpace.app({
            key: this.props.appKey,
            type: this.props.appType,
            name: this.props.appName,
            container: this.el,
        });
    }

    componentDidMount() {
        this.weavy = this.context.weavy;
        this.createWeavyApp();
    }

    shouldComponentUpdate(nextProps: any) {
        // A key must change for the app to change
        var spaceChanged = nextProps.spaceKey !== this.props.spaceKey;
        var appChanged = nextProps.appKey !== this.props.appKey;
        return spaceChanged || appChanged;
    }

    componentDidUpdate(prevProps: any) {
        this.weavyApp.remove();
        this.createWeavyApp();
    }

    componentWillUnmount() {
        this.weavyApp.remove();
    }

    render() {
        return <div className="weavy-container" ref={(el) => (this.el = el)} />;
    }
}
