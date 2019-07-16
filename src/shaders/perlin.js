const perlin = {
  transparent: true,
  uniforms: {
    effectFactor: { type: 'f', value: 1.2 },
    dispFactor: { type: 'f', value: 0 },
    texture: { type: 't', value: undefined },
    texture2: { type: 't', value: undefined },
    disp: { type: 't', value: undefined },
    speed: { type: 'f', value: 0.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D texture;
    uniform sampler2D texture2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    uniform float speed;

    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      disp -= 0.5;

      disp.xy += cos(uv.y * 100. + speed);

      vec2 shift = vec2(uv.x - disp.x, uv.y - disp.y);
      gl_FragColor = texture2D(texture, shift);
    }
`
}

export { perlin }
