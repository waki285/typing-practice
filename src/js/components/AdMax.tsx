// https://zenn.dev/goshouhiro/articles/react-ninja-admax

import React, { useEffect } from "react";

type AdMaxAdType = {
  admax_id: string;
  type: string;
};

const AdMaxSwitch = (props: JSX.IntrinsicElements["div"] & { id: string }) => {
  useEffect(() => {
    if (!window["admaxads"]) window["admaxads"] = [];
    const admaxads: AdMaxAdType[] = window["admaxads"];
    if (!admaxads.some(ad => ad.admax_id === props.id))
      admaxads.push({
        admax_id: props.id,
        type: "switch"
      });
    const tag = document.createElement('script');
    tag.src = 'https://adm.shinobi.jp/st/t.js';
    tag.async = true;
    document.body.appendChild(tag);
    return () => {
      document.body.removeChild(tag);
      admaxads.splice(admaxads.findIndex(ad =>
        ad.admax_id === props.id), 1);
      window["__admax_tag__"] = undefined;
    }
  }, []);
  return <div
    className={`admax-switch inline-block ${props.className || ""}`}
    data-admax-id={props.id} />
}

export { AdMaxSwitch, type AdMaxAdType };