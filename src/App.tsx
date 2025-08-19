import { QRCodeCanvas } from "qrcode.react";
import { useMemo, useRef, useState, type ChangeEvent } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [qrSize, setQRSize] = useState("550");
  const [imageSrc, setImageSrc] = useState("");
  const [imageScale, setImageScale] = useState(50);
  const [imageOpacity, setImageOpacity] = useState(100);

  const maxImageSize = useMemo(() => Number(qrSize) * 0.25, [qrSize]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleQRSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQRSize(event.target.value);
  };

  const handleDownload = () => {
    const image = canvasRef.current!.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `your-qrcode-${new Date().getTime()}.png`;
    link.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setImageScale(100);
        setImageOpacity(100);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <div>
      <div className="m-auto w-fit">
        <div className="input-container">
          <label htmlFor="url">Enter URL</label>
          <input className="input my-2" id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="qr-size">QR Size <div>{qrSize}px</div></label>
          <input
            id="qr-size"
            type="range"
            min="100"
            max="1000"
            step="25"
            value={qrSize}
            onChange={handleQRSizeChange}
            className="range"
          />
        </div>
        <div className="input-container">
          <label htmlFor="image">Image</label>
          <div className="w-full">
            <div className="flex flex-row w-full">
              <input
                ref={fileInputRef}
                id="image"
                className="file-input flex-1.5"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imageSrc && (
                <button
                  className="btn text-red-500 flex-1"
                  onClick={() => {
                    setImageSrc("");
                    fileInputRef.current!.value = "";
                  }}
                >
                  remove
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="image-scale">Image Scale</label>
          <input
            disabled={!imageSrc}
            id="image-scale"
            type="range"
            min={1}
            max={100}
            value={imageScale}
            onChange={(e) => setImageScale(Number(e.target.value))}
            className="range"
          />
        </div>
        <div className="input-container">
          <label htmlFor="image-opacity">Image Opacity</label>
          <input
            disabled={!imageSrc}
            id="image-opacity"
            type="range"
            min={0}
            max={100}
            value={imageOpacity}
            onChange={(e) => setImageOpacity(Number(e.target.value))}
            className="range"
          />
        </div>
        <div className="">
          <button id="download" className="btn w-full" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 w-full">
        <QRCodeCanvas
          ref={canvasRef}
          className="max-w-80 max-h-80 min-w-80 min-h-80"
          marginSize={1}
          value={url}
          size={Number(qrSize)}
          level="Q"
          imageSettings={
            imageSrc
              ? {
                  src: imageSrc,
                  width: (imageScale * maxImageSize) / 100,
                  height: (imageScale * maxImageSize) / 100,
                  excavate: true,
                  opacity: imageOpacity / 100,
                }
              : undefined
          }
        />
        <a className="link link-hover" href="https://github.com/PhasitWo/free-qrcode-web/blob/master/LICENSE.txt">
          github.com/PhasitWo/free-qrcode-web
        </a>
      </div>
    </div>
  );
}

export default App;
