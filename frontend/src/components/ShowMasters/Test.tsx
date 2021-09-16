import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Placemark } from "react-yandex-maps";

const makeLayout = (layoutFactory: any, component: any, contentKey: any) => {
  const Layout = layoutFactory.createClass("<div></div>", {
    build: function () {
      Layout.superclass.build.call(this);

      Layout.updateReactTree = () =>
        ReactDOM.unstable_renderSubtreeIntoContainer(
          component,
          <div>{component.props[contentKey]}</div>,
          this.getElement().querySelector("div")
        );

      Layout.updateReactTree();
    },
    clear: function () {
      Layout.updateReactTree = null;
      Layout.superclass.clear.call(this);
    },
  });

  return Layout;
};

class ActivePlacemark extends React.Component {
  static contextTypes = {
    ymaps: PropTypes.object.isRequired,
  };

  static propTypes = {
    balloonContent: PropTypes.node.isRequired,
  };

  constructor(props: any, context: any) {
    super(props);
    //@ts-ignore
    this.balloonLayout = makeLayout(
      context.ymaps.templateLayoutFactory,
      this,
      "balloonContent"
    );
  }
  //@ts-ignore

  componentDidUpdate(prevProps) {
    //@ts-ignore

    if (prevProps.balloonContent !== this.props.balloonContent) {
      //@ts-ignore

      if (this.balloonLayout.updateReactTree) {
        //@ts-ignore

        this.balloonLayout.updateReactTree();
      }
    }
  }

  render() {
    return (
      <Placemark
        {...this.props}
        options={{
          //@ts-ignore

          balloonContentLayout: this.balloonLayout,
          balloonPanelMaxMapArea: 0,
          //@ts-ignore

          ...this.props.options,
        }}
      />
    );
  }
}

export default ActivePlacemark;
