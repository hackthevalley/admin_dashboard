import React, {Component} from 'react';

const GlobalContext = React.createContext({});

/**
 * Returns a component with GlobalContext.Provider
 * @param WrappedComponent
 * @returns {React.Component}
 */
export function withGlobalContextProvider(WrappedComponent) {
    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                authenticationToken: null,
                authenticated: false,
                hackers: [],
                events: [],
                reduce: this.reduce
            };
        }

        reduce = (newState) => {
            this.setState({
                ...newState
            });
        };

        render() {
            return (
                <GlobalContext.Provider value={this.state}>
                    <WrappedComponent {...this.props} />
                </GlobalContext.Provider>
            )
        }
    }
}

/**
 * Returns a component with globalContext as prop
 * @param WrappedComponent
 * @returns {React.Component}
 */
export function withGlobalContext(WrappedComponent) {

    return class extends Component {
        render() {
            return (
                <GlobalContext.Consumer>
                    {value => {
                        return <WrappedComponent globalContext={value} {...this.props} />
                    }}
                </GlobalContext.Consumer>
            )
        }
    }
}