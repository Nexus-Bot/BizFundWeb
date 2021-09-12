import { Component } from "react";
import WeavyContext from "./WeavyContext";
import "./weavy.css";

interface Props {
    jwt: string;
}
interface State {
    weavy: any;
}

export default class Weavy extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        console.log(this.props.jwt);
        this.state = {
            // @ts-ignore
            weavy: new window.Weavy({ jwt: this.props.jwt, init: false }),
        };
    }

    componentDidMount() {
        this.state.weavy.init();
    }

    componentWillUnmount() {
        this.state.weavy.destroy();
    }

    render() {
        return (
            <WeavyContext.Provider value={this.state}>
                {this.props.children}
            </WeavyContext.Provider>
        );
    }
}
