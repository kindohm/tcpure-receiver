# tcpure-receiver

A VS Code extension that randomizes bits of Tidal code in reaction
to MIDI controller input.

## DSL

### randomization

```
//knobXX/f/[min]/[scale] ✅
//knobXX/plies/[count|n]/[min]/[max] ✅
//buttonXX/onoff ✅
//buttonXX/plytype ✅
//knobXX/i/[min]/[max] ✅
//knobXX/fstep/[count]/[min]/[max] ✅
//knobXX/istep/[count]/[min]/[max] ✅
```

## todo

Add a `#walk` suffix to gently modify instead of randomize

```
//knob01/f/3/20#walk
```
