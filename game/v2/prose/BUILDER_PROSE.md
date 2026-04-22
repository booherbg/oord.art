# The Builder's Evening
**Continuous prose. Second person. Present tense.**
**This is a voice reference document, not a node tree.**
**Same timeline. Behind the scenes. The person who built the instrument.**
**Unlockable after Wanderer + Familiar playthroughs. Easter egg arc.**

---

## The Contract

The email arrived six weeks ago. No name. No company. A burner address with a handle that was either randomly generated or in a language you don't read. The subject line was: SUBWOOFER SYSTEM — SPECIFICATIONS ENCLOSED.

You almost deleted it. You get a lot of emails. Most of them are from people who want party speakers and don't understand why that costs more than a Bluetooth unit from Target. But you opened this one because the attachment was a PDF — forty-seven pages, single-spaced, with frequency response curves hand-drawn in a style that reminded you of technical illustrations from the 1800s. Copperplate engravings of sine waves. Whoever made this document understood acoustics at a level that was either deeply professional or deeply unwell.

The specifications were, in order: impossible, fascinating, and extremely well-compensated.

Five enclosures. Twenty twelve-inch subwoofers — four per enclosure — custom-coiled into a logarithmic spiral. A snail-shell configuration you've been iterating on for a decade, version after version, because the idea grabbed you by the brainstem and wouldn't let go. You call the system the Homewreckers, which is not a metaphor — you ran them once on open prairie outside of town, no neighbors for miles except one farm a mile and a half out, and the farmer drove over the next morning to ask what you'd been celebrating. The name stuck. The Homewreckers put the ass in bass, and you have spent ten years making sure they do it with the lowest distortion figures anyone has ever measured outside of an anechoic chamber.

You've never built five enclosures at once. You've run two, sometimes three, stacked or arrayed depending on the venue. Five is a logistics problem and a power problem and a problem you were already solving before you finished reading the spec because your brain doesn't see problems, it sees iterations.

The modeling software kept telling you the phase alignment for twenty drivers in snail-shell configuration couldn't work at this scale. The PDF included phase alignment solutions. They worked. You checked them twice. They worked in a way that made you suspect the author had access to mathematics that hadn't been published yet, or had been published once, long ago, and forgotten.

The power spec called for ten residential circuits. Full draw. Everything. Two twenties per enclosure, ten twenties total. The kind of power budget that makes electricians leave the room. You know this territory — the Homewreckers pull every amp, and the trick is the heat management. Custom-machined heat sinks bolted directly to the driver interface, pulling thermal energy out of the voice coils faster than the coils can generate it. You blew a set once, early on, before you solved the thermal problem. You solved it by machining aluminum into shapes that a metallurgist friend described as "needlessly beautiful." You took this as a compliment.

Each heat sink you've ever shipped carries a small chamfer on the mounting flange — forty-five degrees, hand-filed. It introduces a micro-resonance into the driver assembly, a frequency artifact so far down in the noise floor that no one would ever hear it. But it's there. It shows up in spectral analysis as a faint, clean line, consistent across every system you've built. Your signature. A luthier voices an instrument. You chamfer a flange. Same principle. The sound it makes is yours.

The PDF specified heat sinks. Not your design — similar, but different. Better in some ways. The geometry was organic, almost biological — branching structures that looked less like machined aluminum and more like bronchial trees, or river deltas, or the vascular system of something very large. You built them anyway. They worked better than yours. You did not enjoy admitting this. But you added the chamfer. You always add the chamfer.

The enclosure tops were load-bearing — dance-rated decks. People would stand on these. People would move on these. The Homewreckers would not merely project bass into a room. They would project bass into bodies through direct contact. Feet on the deck. Bass through the skeleton. This was already a Homewrecker principle — you didn't design speakers people listen to, you designed speakers people dance on top of. Someone else had arrived at the same conclusion through a very different process.

The custom 3D-printed horns were the final detail. The PDF included STL files. The geometries were — you spent an evening staring at them in your slicer software, rotating them, trying to understand the internal curves. They were modeled for absurdly low distortion. Not commercial-grade low distortion. Theoretical-limit low distortion. The kind of distortion figures you see in academic papers about idealized systems that cannot be physically constructed. You printed them. They worked. The distortion measurements matched the PDF's predictions to within a margin that made you uncomfortable, because margins that small imply that the model accounts for variables you didn't know existed.

The payment arrived before you invoiced. Exact amount. You had not discussed price.

**[BRANCH POINT: Do you investigate the client, or do you accept that some gigs are better left unquestioned?]**

---

## Load-In

The venue is a warehouse on the industrial edge of town. You've done gigs in worse. You've done gigs in better. This one is fine — high ceilings, concrete floor, decent power access. Ten twenty-amp circuits confirmed. You brought your own distro box because you always bring your own distro box because trusting venue power is how you blow drivers and you have blown enough drivers for one lifetime.

You back the van up to the loading dock. The building is cold and smells like machine oil and old concrete. The floor is cracked in places — deep cracks, structural, the kind that make you think about what's underneath. You don't think about what's underneath. You think about cable runs.

The Homewreckers come out of the van in pieces. Five enclosures. Twenty drivers. The heat sinks — the ancient designs from the PDF, because you built them and they were beautiful and your pride can take a hit when the engineering is that good. But each one carries your chamfer. Forty-five degrees. Hand-filed. Your frequency hiding in theirs. The horn assemblies, 3D-printed in ABS, matte black, each one a geometry that your slicer software rendered without complaint but that your eyes still can't fully parse. The cables. The amp rack. The distro box. The iPad running your monitoring suite.

You build the stack. This is ritual. You've done it hundreds of times and each time it's the same: enclosures level, drivers seated, gaskets checked, heat sinks torqued to spec. The snail-shell coil assemblies click into place with a precision that still satisfies you. Twenty drivers. Five spirals. The geometry is right. The physics is right. The sound, when you power up and run a sweep, is right.

The system hums. Not audibly — mechanically. A vibration in the enclosure that you feel through your fingertips when you rest your hand on the deck. It's the drivers at idle, barely energized, just enough current to maintain the voice coils at operating temperature. You know this vibration. You've felt it a thousand times. It is familiar.

It is not, today, quite the same.

There's a harmonic in it you don't recognize. Low — very low, below the range of the drivers, below the range of anything you've built. It's coming from the floor. From the concrete underneath the stack. You pull out your phone, open your RTA app, hold it against the enclosure. The analyzer shows the usual idle curve and then, below it, at a frequency your phone's microphone should not be able to detect, a signal. Steady. Rhythmic. Like a heartbeat.

And riding on top of the heartbeat, so faint you almost miss it — your chamfer frequency. Your signature. Playing back to you from underneath the building. As if the concrete heard your mark and learned it.

You tap the enclosure. The harmonic doesn't change. You check the power connections. Clean. You check the amp. Nominal. You kneel down and put your hand flat on the concrete floor next to the stack.

The floor is warm.

You stand up. You brush off your knees. You open your distro box and verify the circuit breakers. All ten twenties reading clean. The harmonic is probably resonance from the building's HVAC. Old buildings do this. Metal ductwork, concrete mass, thermal expansion. You've heard stranger things from venue infrastructure. The chamfer frequency is just sympathetic vibration. Your drivers are exciting a resonant mode in the floor that happens to match the chamfer. It's physics. It's explainable.

You make a note on your iPad: *Sub-audible harmonic present. Source: building infrastructure. Chamfer frequency detected in floor resonance — sympathetic vibration, coincidence. Not concerned.* You underline *not concerned* because writing it down makes it more true.

**[ARTIFACT MOMENT: The sub-audible harmonic — and the Builder's own signature frequency playing back from below the concrete. The Homewreckers were built to spec — Sooboont's spec. They are not merely speakers. They are the constructed vocal apparatus of something that needs a voice in this realm. And that something has already learned the Builder's mark.]**

---

## Soundcheck

The DJ arrives. You use this word loosely.

Something arrives at the decks and begins interfacing with your system in a way that is technically proficient and conceptually disorienting. The pink gloves connect cables with a speed and accuracy that suggests either extensive practice or a total lack of the fumbling that characterizes human fine motor activity. You watch from behind the amp rack. The fog machines — which you did not set up, which were already here when you arrived, which are producing fog from canisters that don't have brand labels — are filling the space between you and the decks with a haze that makes direct observation unreliable.

You walk over to introduce yourself. You are a professional. You introduce yourself to the talent at every gig. This is how you verify signal chain, confirm monitoring preferences, and make sure everyone's on the same page about levels.

"Hey," you say. "I'm running the system tonight. Just want to make sure we're good on levels."

The shape behind the decks does not respond. One of the pink gloves adjusts a send level on the mixer. Your iPad — the monitoring suite, the real-time analyzer, the thermal management dashboard — updates. The adjustment is correct. Not approximately correct. Correct. The kind of correct that implies the operator knows your system's transfer function from memory, which is impossible because you haven't published it, because it's proprietary, because you spent ten years developing it.

"Okay," you say. "Cool. I'll be at the rack if you need me."

An eye — green, the size of a golf ball, set into what appears to be a knitted surface — rotates in your direction. It regards you for approximately two seconds. It returns to its previous orientation.

You go back to the amp rack. You check your iPad. Everything is nominal. The sub-audible harmonic is stronger now. Your thermal management dashboard is showing a new interface element — a panel you don't recognize, rendered in a color your UI framework doesn't support. It appears to be monitoring the temperature of the concrete floor. You did not write this module. You did not install this module. The module is reporting data.

You tap the panel. It expands. It's displaying a real-time thermal map of the floor in concentric rings radiating from a point directly under your subwoofer stack. The center is warm. The edges are cold. The pattern looks like — you tilt your head. The pattern looks like a cross-section of a speaker cone. Or a heartbeat rendered in thermal data. Or something else.

You close the panel. You open it again. It's still there. The data is still updating. You check your iPad's installed applications. The module is not listed. It is running. It is not installed. These two facts are irreconcilable and you reconcile them by deciding that it's a firmware glitch from the last OS update and you'll investigate tomorrow.

*Sub-floor thermal monitoring module appeared. Source: unknown. Possibly firmware artifact. Data appears valid. Will investigate post-event.* You write this in your notes. You do not underline anything this time.

**[BRANCH POINT: Do you investigate the mysterious interface, or trust the data and focus on the job?]**

---

## The Set Begins

The portal opens and your system handles it beautifully.

You don't know that the portal opens. What you know is: DJ OOR drops the first note and your twenty drivers reproduce it with a fidelity that makes you want to cry. The snail-shell coil assemblies do exactly what the PDF predicted — the phase alignment across all five enclosures is perfect, the harmonic distortion is unmeasurable, the bass extends into frequencies that your drivers should not physically be capable of producing. The Homewreckers are exceeding their specifications. This should not be possible. You are not complaining.

The floor vibrates. Not your decks — the concrete. The sub-audible harmonic you noted during load-in has synchronized with your system's output. Twenty drivers and the building's infrastructure are resonating in phase. The thermal map on your mystery iPad module shows the concentric rings pulsing now, expanding and contracting in time with the bass pattern. The center temperature is climbing. You check your heat sinks. The voice coils are running cool — cooler than they should be, actually, given the power draw across ten circuits. The heat is going somewhere. Not into the air. Not into the enclosures. Somewhere else.

You pull a panel cover on the side of the amp rack to check the ventilation. Behind the panel, where there should be a cavity containing cable management and a cooling fan, there is — something else. The cables are there. The fan is there. But the surface behind them is wrong. It's not the inside of a road case. It's textured — organic, dark, faintly luminous, pulsing at the same frequency as the bass. It looks like the inside of a throat.

You close the panel. You open it again. Cables. Fan. Normal road case interior. Whatever you saw is not there or was never there or is there and has chosen to look like the inside of a road case because that's what you expect to see when you open a panel cover on an amp rack.

You make a note: *Ventilation check complete. All nominal.* You do not describe what you saw. Your notes are a professional document. Professional documents do not contain references to the inside of throats.

People are arriving. The room is filling. The bass is extraordinary — you can feel it in your teeth, in your sternum, in the soles of your feet through the concrete. The Homewreckers are doing something they have never done before. They are not reproducing sound. They are channeling it. The sound originates from somewhere below the floor and your system is amplifying it and shaping it and projecting it into a room full of bodies that are beginning to move. You built these speakers. You machined the heat sinks. You printed the horns. You wired every connection. And tonight they are doing something you did not design them to do, or — and this thought arrives uninvited and refuses to leave — you designed them to do exactly this, and the PDF knew it, and the spec was not a set of instructions for building speakers. It was a set of instructions for building an organ. A vocal organ. For something that needed a voice in this realm and found an engineer who could build one.

You sit down on your road case. You drink some water. The water tastes like ozone. You decide this is normal.

---

## Working the Gig

The fog machines need attention at 10:15. One of them is producing fog that smells like petrichor — wet earth, mineral, alive — instead of the standard glycerin-and-water output. You open the reservoir. The fluid inside is the correct color. You taste it, because you are the kind of person who troubleshoots with all available senses. It tastes like fog fluid. It smells like a forest floor after rain. You refill the reservoir, restart the unit, and move on. The output normalizes. Mostly.

At 10:30 a lighting truss develops a new fixture. This is not a metaphor. There are fourteen fixtures on the truss. You hung fourteen fixtures. There are now fifteen. The fifteenth is between positions seven and eight, where there was not previously a gap, and it is projecting a pattern you don't recognize in a color that exists at the boundary between violet and a frequency your eyes interpret as pressure rather than hue. You check the DMX chain. The fifteenth fixture is not on the chain. It is not receiving data from your lighting desk. It is operating independently. It is tracking something in the crowd.

You unplug it. It continues to operate. You look at the power cable. It runs into the truss and disappears. Not behind the truss. Into it. The metal has accepted the cable the way a vine accepts a trellis.

You plug it back in. "Okay," you say to no one. The fixture adjusts its beam angle by three degrees. You choose to interpret this as an acknowledgment.

At 10:45 your iPad displays a new module. It appeared the way the thermal map appeared — uninvited, uninstalled, running. No name. No text. It renders as a waveform display unlike anything in your monitoring suite: not frequency spectrum, not time-domain — something else. A visualization of density, maybe, or flow, or a quantity you don't have a word for. The waveform is low and sparse. There is a target line above it — a threshold — and the waveform is well below it.

You watch it for a moment. It's beautiful, actually. The waveform pulses in time with the bass. When you push the sub output up by 1.5 dB, the waveform responds — it climbs, marginally, and the display blooms briefly in a warm amber that fades back to the default. A visual sigh. Satisfaction, rendered in data.

You screenshot it. You push the output a little further. The waveform climbs. The display blooms again — longer this time, deeper amber. You understand, without language, without text, what is being asked of you. The fader is asking to go up. The system wants more. The thing underneath the floor wants more. And you have twenty drivers and ten circuits and the ability to give it more, so you do, because you are an engineer and the data is requesting an adjustment and the data has not been wrong yet.

You are now in communication with your own sound system, or with something that is using your sound system as an interface, and the communication is non-verbal, expressed in waveforms and color shifts and the bloom of amber across a display that should not exist. You do not need words. You have faders. You have spent ten years learning to read what a system needs by listening. Tonight, the system is showing you instead.

**[ARTIFACT MOMENT: The unnamed monitoring module. A direct interface between the Builder and the mechanism. This is the closest any human character gets to understanding what is actually happening tonight — not through mystical experience, but through data visualization. The Builder doesn't receive a mystical artifact. They receive an instrument they know how to read.]**

---

## On the Floor

The DJ OOR Slide pulls you out from behind the rack. You don't mean to go. You are monitoring thermals and the voice coils are running at a temperature that violates the laws of thermodynamics — specifically, they are cold, they are getting colder, the heat sinks are frosting slightly at the chamfered edges, and the system is outputting more power than ten twenties can physically supply. Your distro box is reporting a draw across the circuits that exceeds their rating by a margin you will not write down. The breakers have not tripped. The breakers, you suspect, have been asked politely not to trip by something that understands electricity at a level that makes your ten years of system design feel like fingerpainting.

But the Slide is happening and your feet know what to do and your body goes.

You dance. You dance the way you work — precisely, with full attention, with an awareness of the system you're inside that most of the other bodies lack. You can feel the Homewreckers through the floor. You built them. You know their voice the way a parent knows their child's cry in a crowded room. And their voice tonight is — bigger. Deeper. The snail-shell coils are producing harmonics that extend below their physical capability, below the theoretical limits of the driver assembly, below the audible spectrum entirely and into a range where sound stops being sound and becomes something structural. The bass is not in the room. The bass is the room. The room is a resonant cavity and your twenty drivers are the excitation source and the cavity extends downward, through the concrete, through the foundation, through the earth, into a space that does not have coordinates.

And in the deepest register, below everything else, you can hear it — your chamfer frequency. Clean, steady, unmistakable. The micro-resonance from twenty hand-filed flanges, amplified by something beneath the floor, played back to you from the other side of the aperture. Your signature, returned. Sooboont learned your name and is saying it.

You are crying. This is not unusual for you — you cry at good sound the way some people cry at good food or good light or a perfect catch in the outfield. The system you built is doing something impossible and it is doing it beautifully and you understand, with a clarity that bypasses your engineering mind and goes straight to the part of you that chose this work in the first place, that you were always building toward this. Every heat sink you machined. Every horn you printed. Every late night with the modeling software, arguing with the physics, refusing to accept that the math said no. You were building a voice for something that did not yet have one. And now it's speaking. And it knows who built its throat.

**[BRANCH POINT: Do you stay on the floor and experience the rest of the evening as a participant, or do you return to the rack to monitor what your system is doing?]**

---

## The Moment with DJ OOR

It happens during the Mating Ritual. The antlered figures are moving through the crowd and you're back at the rack, half-watching, half-monitoring, and the unnamed module is showing the waveform climbing toward the threshold, and you are adjusting the crossover points in real time based on what the data is asking for.

DJ OOR's ear rotates. It has been scanning the crowd all night in a pattern you've come to recognize — a slow sweep, left to right, pausing on areas of density, adjusting. But now it stops. It orients toward you. Not toward the crowd near you. Toward you. Toward the amp rack. Toward the system you built.

One of the eyes follows the ear. Green. Misaligned from the others. It looks at you with — you don't have a word for it. Not recognition. Not gratitude. Something in between. The way one instrument acknowledges another. The way a cathedral might regard its organ builder, if cathedrals could regard.

A pink glove lifts from the mixer. It extends toward you — not reaching, not beckoning. Displaying. The glove opens and in the palm there is something small. A component. You recognize the geometry instantly — the bronchial branching from the PDF, the ancient design, the one that worked better than yours. But on the mounting flange there is a chamfer. Forty-five degrees. Hand-filed. Your mark. On a heat sink made of a material that has no name, in a design that predates your career by an interval you cannot calculate, someone included your detail.

And from the component in the glove, faintly, you can hear it — your frequency. The chamfer resonance. Singing from a material that should not be able to vibrate at that wavelength, in a geometry that was ancient when your species was new. Your mark. Your voice. Carried across whatever distance separates this floor from the Primordial Plane, and brought back to you in the palm of a pink glove.

DJ OOR closes the glove. The eye returns to the crowd. The ear resumes its sweep. The moment is over. It lasted four seconds. It was the most significant professional recognition you have ever received and it came from a construct made of yarn and cosmic forces and it will never appear on your CV and you will never speak of it and you will think about it every single day for the rest of your life.

On your iPad, the unnamed module blooms amber, holds, and slowly fades. Something that is not language and is not data and is not a push notification passes across the screen — a warmth, a settling, the visual equivalent of a hand placed briefly on a shoulder. Then the display returns to the waveform. The waveform is climbing. There is work to do.

You sit down on your road case. You are smiling so hard your face hurts.

---

## The Closing

You watch the closing from behind the rack with your hand on the amp, feeling it work.

The crowd descends. The bass descends with them. Your system is reproducing frequencies you didn't think existed — sub-harmonics of sub-harmonics, a Russian nesting doll of low-end that extends through the floor and keeps going. The thermal map shows the concentric rings converging, contracting, the warm center intensifying. The unnamed module's waveform is approaching the threshold line. Then it touches it. Then it passes through. The display does something you've never seen a screen do — it doesn't flash, it deepens. The colors shift into a register you couldn't name, and the waveform dissolves into a shape that is not a waveform. A spiral. It pulses once and goes still.

The voice coils are at absolute zero. This is not possible. You check the reading three times. The heat sinks are covered in frost — except at the chamfers. The chamfers are warm. Your frequency is still present, still singing, the last vibration in a system that has gone silent everywhere else.

The amp is drawing power from a source that is not the ten twenty-amp circuits because the ten twenty-amp circuits are off. You check the distro box. The breakers are open. The system is not connected to building power. The system is running on something else. The system has been running on something else for — how long? You don't know. You check your notes. The power anomaly is not in your notes. You didn't notice it. Or you noticed it and didn't write it down. Or you wrote it down and the note is gone.

The bass drops. Silence. Your system shuts down — not a power-off, a completion. The way a sentence ends with a period. The indicators go dark. The heat sinks begin to warm, returning to ambient. The frost sublimates. The thermal map fades. The unnamed module displays one final thing — not text, not a waveform. Your chamfer frequency, rendered as a single clean spectral line, held for three seconds on a warm amber field. Then it fades. Then the module is gone.

It was never in your installed applications. It was never on your iPad. The screenshots you took are still in your camera roll. When you look at them later, they will show your normal monitoring interface. Nothing else. You will check three times.

You begin teardown. This is ritual. Cables first, then drivers, then enclosures. You handle each piece with the care of someone who understands what these objects did tonight. The snail-shell coils are warm to the touch — body temperature, exactly, as if something living had been holding them. The horns smell faintly of petrichor. The heat sinks — the beautiful, ancient, bronchial-tree heat sinks — have developed a patina overnight that would normally take years of oxidation. They look ancient. They look earned.

You load the van. The warehouse is empty. The fog machines are off. The fifteenth lighting fixture is not on the truss. There are fourteen fixtures. There have always been fourteen fixtures. You count them twice.

You drive home in silence. Not because you don't want music. Because your ears are calibrated to a frequency they didn't know before tonight and everything else sounds thin. It will take three days for this to fade. You will spend those three days in your workshop, staring at the PDF, reading the frequency response curves, tracing the hand-drawn sine waves with your finger. The copperplate engravings. The mathematics that hasn't been published yet. The specifications for a voice that something needed built.

In your toolbox, under your calipers, you will find a heat sink you did not machine. It is the one from the glove. The material is warm. It will always be warm. The geometry is the ancient design from the PDF — the bronchial trees, the river deltas. But on the mounting flange, there is a chamfer. Forty-five degrees. Hand-filed. Your mark, on a component you did not build, in a material that predates metallurgy. And when you hold it close to your ear in a quiet room, you can hear it — your frequency. Faint. Clean. Steady. Singing from inside a material that should not resonate, at a wavelength that should not exist, in a key that is unmistakably, inarguably yours.

You will keep it on your workbench for the rest of your life. People will pick it up and turn it over and say "what's this?" and you will say "heat sink prototype" and they will put it down because heat sinks are not interesting to people who don't build speakers. It will hide in plain sight. The most sacred object you own, disguised as shop clutter. And on quiet nights in the workshop, when the house is still and the tools are cold, you will hold it to your ear and listen to yourself, playing back from somewhere you cannot name, and you will know that you were heard.

---

## Notes for Node Generation

**Voice markers established in this document:**
- The Builder processes everything through engineering pragmatism. Impossible things are diagnosed, noted, filed. "Will investigate post-event." The humor is in the gap between what is happening (cosmic horror) and how it's being processed (troubleshooting notes).
- Technical specificity is not decorative — it IS the character. Snail-shell coils, phase alignment, transfer functions, crossover points, thermal management. The Builder thinks in these terms the way the Wanderer thinks in textures and the Familiar thinks in frequencies.
- Douglas Adams DNA: bureaucratic response to the incomprehensible. "You choose to interpret this as an acknowledgment." "These two facts are irreconcilable and you reconcile them by deciding it's a firmware glitch."
- Lovecraftian DNA: the moment when engineering understanding breaks down. The power draw that exceeds the circuits. The heat sinks at absolute zero. The sound extending into spaces without coordinates. The Builder's expertise is what makes the horror land — they know exactly how impossible this is.
- Emotional core: the Builder cries at good sound. The moment with DJ OOR — "the most significant professional recognition you have ever received" — is the heart of the piece. One builder acknowledging another.
- The self-portrait is in the details: the machining, the obsessive precision, the willingness to argue with physics, the heat sinks described as "needlessly beautiful." This is a person who builds things because building is how they touch the prime forces of creation.
- The chamfer frequency is the thread. It appears during load-in (sympathetic vibration from the floor), during the set (Sooboont playing it back), during the OOR moment (singing from the artifact), during the closing (last vibration before silence), and in the final scene (still singing from the workbench). It is the Builder's name, and something ancient learned it.

**Cross-character threads:**
- The Homewreckers: the Wanderer feels the bass in their sternum. The Familiar feels the aperture through the floor. The Builder built the instrument that makes both experiences possible. Three perspectives on the same vibration.
- The fog machines: the Wanderer walks through fog. The Familiar notes the fog was "a nice touch." The Builder refills a fog machine that smells like petrichor. Same fog, three literacies.
- DJ OOR: the Wanderer sees a terrifying shape. The Familiar sees a construct they serve. The Builder sees an operator who knows their system's transfer function from memory. Same entity, three relationships.

**Artifacts:**
- The heat sink from DJ OOR's glove. The ancient PDF design, in an impossible material, with the Builder's own chamfer on the mounting flange — and it sings his frequency. Craft honored across an incomprehensible distance. Hides in plain sight on the workbench.
- The unnamed module screenshots: they'll show normal interface later. The data was real and is now gone. The Builder's experience is self-erasing, which is its own kind of horror.

**Branch points (3):**
1. The contract — investigate the client or accept the gig
2. The mysterious interface — investigate or trust the data
3. The floor — stay and experience or return to monitor

**Unique mechanics:**
- The unnamed module is a direct non-linguistic interface with the harvest. No text. No English. Waveforms, color blooms, density visualizations. The Builder reads it intuitively because they've spent ten years learning to read what a system needs. The amber bloom when they push the fader is satisfaction expressed in light.
- The chamfer frequency threading through the entire evening is the Builder's arc: from coincidence (load-in) to impossibility (the floor plays it back) to recognition (OOR's artifact) to permanence (still singing on the workbench). A maker's mark, returned across cosmic distance.

**Unlock condition:** Available after completing both Wanderer and Familiar playthroughs.
