declare namespace JSX {
  interface IntrinsicElements {
    'knit-auth': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      authsessiontoken?: string;
      skipIntro?: '';
      onNewSession?: (e: CustomEvent) => void;
      onFinish?: (
        e: CustomEvent & { detail: { integrationDetails: any } },
      ) => void;
      onDeactivate?: (
        e: CustomEvent & { detail: { integrationDetails: any } },
      ) => void;
      onKnitClose?: (
        e: CustomEvent & { detail: { knitClosed: boolean } },
      ) => void;
    };
  }
}
