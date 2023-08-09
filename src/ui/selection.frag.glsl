uniform vec3 color;
uniform float borderWidth;
varying vec2 vUv;

void main() {
    float borderBottom = borderWidth;
    float borderTop = 1.0 - borderWidth;

    if (vUv.x > borderTop || vUv.x < borderBottom || vUv.y > borderTop || vUv.y < borderBottom) {
      gl_FragColor = vec4(color, 1.0);
      return;
    }

    vec3 noColor = vec3(0.0, 0.0, 0.0);
    float dist = distance(vUv, vec2(0.5));
    float gradient = smoothstep(0.0, 1.0, dist);
    vec3 finalColor = mix(noColor, color, gradient);

    gl_FragColor = vec4(finalColor, gradient);
}
