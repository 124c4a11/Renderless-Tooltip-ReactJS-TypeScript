import { useState, useRef, useLayoutEffect } from 'react';
import { Portal } from '../Portal/Portal';

interface TooltipChildProps {
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
}

type TooltipChildPropGetter = <Props extends object>(
  baseProps: Props,
) => Props & TooltipChildProps;

interface TooltipProps {
  text: string;
  children: (props: TooltipChildPropGetter) => React.ReactElement;
}

export function Tooltip({ children, text }: TooltipProps): JSX.Element {
  const [positon, setPosition] = useState({ top: 0, left: 0 });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tooltipEl = tooltipRef.current;

    if (!anchorEl || !tooltipEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    const TOP_SPACE = 5;

    setPosition({
      top: anchorRect.top - tooltipRect.height - TOP_SPACE,
      left: anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2,
    });
  }, [anchorEl]);

  function propsGetter(baseProps: Record<string, unknown>) {
    const { onMouseEnter, onMouseLeave } = baseProps;

    return {
      ...baseProps,
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        if (typeof onMouseEnter === 'function') onMouseEnter(e);

        setAnchorEl(null);
      },
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        if (typeof onMouseLeave === 'function') onMouseLeave(e);

        setAnchorEl(e.currentTarget);
      },
    };
  }

  return (
    <>
      {anchorEl && (
        <Portal>
          <div
            ref={tooltipRef}
            className="tooltip"
            style={{
              top: positon.top,
              left: positon.left,
            }}
          >
            {text}
          </div>
        </Portal>
      )}
      {children(propsGetter as never)}
    </>
  );
}
