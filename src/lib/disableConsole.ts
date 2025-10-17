// utils/disableConsole.ts
export const disableConsole = () => {
    const noop = () => undefined;
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;
};
