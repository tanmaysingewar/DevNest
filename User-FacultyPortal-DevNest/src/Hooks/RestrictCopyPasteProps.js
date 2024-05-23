import { useEffect } from "react";
import { useFullscreen } from "@mantine/hooks";

export const useRestrictCopyPaste = (props) => {
    const { toggle, fullscreen } = useFullscreen();
    useEffect(() => {
        props.actions?.forEach((action) => {
            action && window.addEventListener(action, preventPaste);
        })
        return () => {
            props.actions.forEach((action) => {
                action && window.removeEventListener(action, preventPaste);
            })
        };
    }, [props.window, props.actions]);

    const preventPaste = (e) => {
        // toggle();
        e.preventDefault()
    }
}