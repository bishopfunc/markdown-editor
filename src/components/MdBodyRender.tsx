"use client";
import 'zenn-embed-elements';

export default function MdBodyRender(props: {html: string}) {
    return (
        <div className="znc" dangerouslySetInnerHTML={{ __html: props.html }} />
    )
}