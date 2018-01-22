import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import dashify from "../modules/dashify";

import Html from "../modules/Html";
import Head from "../modules/Head";
import Body from "../modules/Body";

class Default extends Component {
  getChildContext() {
    return {
      pkg: this.props.pkg,
      // collections: this.props.collections,
      file: this.props.file
    };
  }

  render() {
    const { file } = this.props;
    const footer = file.footer === undefined ? true : file.footer;

    if (!file.title) {
      console.log(`${file.filename} doesn't have a title`);
    }
    return (
      <Html>
        <Head
          title={file.title}
          stylesheets={this.props.metadata.assets.stylesheets}
        />
        <Body
          scripts={[
            ...(file.scripts || []),
            ...(this.props.metadata.assets.scripts || [])
          ]}
          version={this.props.metadata.assets.version}
          footer={footer}
        >
          <header
            className={cx({
              "cssnext-Jumbotron": true,
              "cssnext-Jumbotron--default": true,
              ["cssnext-Jumbotron--" + dashify(file.url)]: true,
              ["cssnext-Jumbotron--" +
              file.backgroundModifier]: file.backgroundModifier
            })}
          >
            <div className="r-Grid">
              <div className="r-Grid-cell">
                {file.title && (
                  <h1
                    className={cx("cssnext-Jumbotron-title", "cssnext-Light")}
                  >
                    {file.title}
                  </h1>
                )}
                {file.subtitle && (
                  <strong
                    className={cx(
                      "cssnext-Jumbotron-subtitle",
                      "cssnext-Light"
                    )}
                  >
                    {file.subtitle}
                  </strong>
                )}
              </div>
            </div>
          </header>

          {file.incomplete && (
            <section className="r-Grid cssnext-Callout cssnext-Callout--info">
              <div className="r-Grid-cell">
                <div className="cssnext-Callout-title h4">{"Incomplete"}</div>
                <p>
                  {"This documentation is still a work in progress. "}
                  <br />
                  <a
                    href={
                      "https://github.com/MoOx/postcss-cssnext/issues" +
                      "?q=is%3Aopen+is%3Aissue+label%3A%22type%3A+documentation"
                    }
                  >
                    {"Pull requests"}
                  </a>
                  {" expanding on existing or adding additional content " +
                    " are "}
                  <strong>{"extremely"}</strong>
                  {" appreciated."}
                </p>
              </div>
            </section>
          )}

          <section className="r-Grid cssnext-Section">
            <div
              className={cx({
                [file.className]: file.className,
                "r-Grid-cell": true,
                "js-markdownIt-TOCOriginalContainer": true
              })}
              dangerouslySetInnerHTML={{ __html: file.contents }}
            />
            <div
              className={cx({
                "r-Grid-cell": true,
                "js-markdownIt-TOCPlaceholder": true
              })}
            />
          </section>

          {footer && (
            <div
              className={cx(
                "cssnext-Jumbotron",
                "cssnext-Jumbotron--default",
                "cssnext-Center",
                "cssnext-Light"
              )}
            >
              <div className="cssnext-Jumbotron-title">
                <a href="/playground/">
                  {"Try postcss-cssnext in your browser now."}
                </a>
              </div>
            </div>
          )}
        </Body>
      </Html>
    );
  }
}

Default.propTypes = {
  pkg: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  // collections: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
};

Default.childContextTypes = {
  pkg: PropTypes.object.isRequired,
  // collections: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
};

export default Default;
