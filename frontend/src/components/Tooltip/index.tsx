import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 10 }}
  />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    "&::before": {
      backgroundColor: "#fff",
      border: "1px solid #8e8e8e",
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#8e8e8e",
    fontSize: "1.6vh",
    fontFamily: "'Inter 600'",
    border: "1px solid #8e8e8e",
  },
}));
