interface VideoEmbedProps {
  src: string;
}

export function VideoEmbed({ src }: VideoEmbedProps) {
  return (
    <div className="w-full mb-4 rounded-lg overflow-hidden" style={{ aspectRatio: "1744/1000" }}>
      <iframe
        className="w-full h-full"
        src={src}
        title="How-to Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}