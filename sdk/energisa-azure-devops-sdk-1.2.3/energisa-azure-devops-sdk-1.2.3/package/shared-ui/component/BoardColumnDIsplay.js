import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const BoardColumnDisplay = ({ color, text }) => {
    return (_jsxs("div", Object.assign({ className: "flex-row flex-center" }, { children: [_jsx("div", { style: {
                    backgroundColor: `#${color}`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%'
                } }), _jsx("span", Object.assign({ className: "margin-left-16" }, { children: text }))] })));
};
