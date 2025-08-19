import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const image = canvasRef.current!.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "your-qrcode.png";
    link.click();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <QRCodeCanvas ref={canvasRef} value={url} size={350} />
      <div>
        <label htmlFor="url">Enter URL:</label>
        <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleDownload}>Download</button>
      </div>
        <a href="https://github.com/PhasitWo/free-qrcode-web">github.com/PhasitWo/free-qrcode-web</a>
    </div>
  );
}

export default App;
