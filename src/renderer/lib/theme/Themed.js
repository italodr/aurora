import base from "./base.js";
import React from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

// Note: Eslint kinda messes up on this particular usage of template literal functions
// So we put a disable comment here.
/* eslint-disable no-unused-expressions */
injectGlobal`
    html, body, #root {
        font-family: ${base.font};
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        background: ${base.colors.background};
        color: ${base.colors.text};
    }

    * {
      box-sizing: border-box;
    }
`;

const Expand = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
`;

// A helper for wrapping something in the default theme.
// Replaces a regular ThemeProvider from styled-components
// https://www.styled-components.com/docs/advanced#theming
const Themed = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Expand>{children}</Expand>
    </ThemeProvider>
  );
};

Themed.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.object
};

// By default use the base theme
Themed.defaultProps = {
  theme: base
};

export default Themed;
