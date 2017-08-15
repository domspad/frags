#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.);
vec3 colorB = vec3(1.000);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

float bump (float b, float x){
    float width = 0.4;
    float buffer = 0.03;
    return smoothstep(b-width,b,x+buffer) - smoothstep(b-buffer,b+width,x);
}

float dist(vec2 p1, vec2 p2){
    // p1, p2: [0,1]^2
    return abs(length(p2 - p1));
}

float circle(vec2 center, float rad, vec2 st){
    // center: [0,1]^2
    // rad: [0, inf]
    return float(dist(st, center) < rad);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    
     pct.r = smoothstep(-0.6,0.2,st.y);
     pct.g = smoothstep(-0.3,0.7,st.y);
     pct.b = smoothstep(0.3,1.,st.y);

    float sun_r = 0.1;
    color = mix(colorA, colorB, pct) * circle(vec2((0.5-sun_r)*cos(u_time)+0.5,sin(u_time)*(1.-sun_r)), sun_r, st);
    // bump(sin(u_time)+0.5,st.y);

    // Plot transition lines for each channel
    //color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    //color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    //color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
