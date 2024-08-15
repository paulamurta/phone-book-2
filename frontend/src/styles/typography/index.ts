import styled, { css } from "styled-components";

interface ITypography {
  fontcolor?: string;
}

export const Header1 = styled.h1<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(1.2rem, 1.2rem + 5.3vh, 4.2rem);
    font-family: "Inter 800", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Header2 = styled.h2<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(1rem, 0.8rem + 3.8vh, 4rem);
    font-family: "Inter 800", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Header3 = styled.h2<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(0.8rem, 0.7rem + 3.2vh, 3rem);
    font-family: "Inter 600", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Header4 = styled.h2<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(0.6rem, 0.4rem + 2.1vh, 2.8rem);
    font-family: "Inter 600", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Body1 = styled.p<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(0.5rem, 0.4rem + 2.2vh, 2.8rem);
    font-family: "Inter 600", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Body2 = styled.p<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(0.35rem, 0.3rem + 1.8vh, 2rem);
    font-family: "Inter 400", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Body3 = styled.p<ITypography>`
  ${({ theme, fontcolor }) => css`
    font-size: clamp(0.3rem, 0.25rem + 1.5vh, 1.7rem);
    font-family: "Inter 400", sans-serif;
    color: ${fontcolor ? fontcolor : theme.colors.typography.body};
  `}
`;

export const Small = styled.small<ITypography>`
  ${({ theme }) => css`
    font-size: clamp(0.1rem, 0.4rem + 0.75vh, 1.3rem);
    font-family: "Inter 200", sans-serif;
    color: ${theme.colors.typography.body};
  `}
`;

export const LabelText = styled.p<ITypography>`
  width: 100%;
  color: ${({ theme, fontcolor }) => (fontcolor ? fontcolor : theme.colors.typography.body)};
  font-family: "Inter 400", sans-serif;
  font-size: clamp(0.2rem, 0.5rem + 0.9vh, 2rem);
`;
