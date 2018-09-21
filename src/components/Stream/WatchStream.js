import React from 'react';
import { Player } from 'broadway-player';

class WatchStream extends React.Component {
  constructor(props) {
    super(props);

    this.socket = this.props.socket;
    this.VideoPlayer = new Player({
      useWorker: true,
      webgl: 'true',
      workerFile: '../../Decoder.js',
    });

    this.socket.on('stream', (stream) => {
      this.VideoPlayer.decode(new Uint8ClampedArray(stream));
      this.ctx.drawImage(this.VideoPlayer.canvas, 0, 0);
    });
  }

  componentDidMount() {
    this.ctx = this.canvasNode.getContext('2d');
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={(node) => {
            this.canvasNode = node;
          }}
          width={1280}
          height={900}
        />
      </div>
    );
  }
}

export default WatchStream;