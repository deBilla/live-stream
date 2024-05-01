const { spawn } = require('child_process');

// FFmpeg command
const ffmpegArgs = [
    '-i', 'rtmp://localhost/live/STREAM_NAME',
    '-c:v', 'libx264', '-c:a', 'aac',
    '-preset', 'veryfast', '-tune', 'zerolatency',
    '-crf', '23', '-profile:v', 'main', '-level', '3.1',
    '-map', '0:v', '-map', '0:a',
    '-f', 'hls', '-hls_time', '10', '-hls_list_size', '0', '-hls_segment_filename', 'hls/output_%03d.ts', 'hls/output.m3u8',
    '-f', 'dash', '-seg_duration', '10', '-use_template', '1', '-use_timeline', '1', '-init_seg_name', 'init-stream$RepresentationID$', '-media_seg_name', 'chunk-stream$RepresentationID$-$Number%', 'dash/output.mpd'
];

// Spawn FFmpeg process
const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

// Handle FFmpeg output
ffmpegProcess.stdout.on('data', (data) => {
    console.log(`FFmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
});

// Listen for FFmpeg exit
ffmpegProcess.on('close', (code) => {
    console.log(`FFmpeg process exited with code ${code}`);
});

// Listen for FFmpeg errors
ffmpegProcess.on('error', (err) => {
    console.error('FFmpeg process error:', err);
});
