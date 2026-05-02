<h1 align="center">
  <img alt="KIC Logo" src="public/images/logo-canonical.png" width="100" />
  </br>
  kicanter.dev
</h1>

## Contents

* [Impress](#impress)
* [Design](#design)
* [Development](#development)
* [Responsiveness & Accessibility](#responsiveness--accessibility)
* [Technical Challenges & Solutions](#technical-challenges--solutions)
* [Infrastructure](#infrastructure)

## Impress

I built my portfolio website to serve as a central hub for presenting myself as a distinct, branded computer scientist. I wanted a place where I could showcase my skills, projects, and professional identity in a minimalist yet polished manner. This site reflects my desire to develop applications to not just function, but to _**impress**_.

Below you will find an **exorbitant** amount of info regarding my thought processes, decisions, challenges, and overall design/development workflow involved in constructing my site. I recognize most will skip this, but my hopes are that my diligence in documenting the entire procedure will end up helping anyone that has questions about choices I made or confusion about building their own site.

## Design

Driven by a desire to capture a modern, clean aesthetic that still delivers a unique visual, I focused on creating a minimalist yet engaging layout, balancing simplicity with functional elegance. My goal was to prioritize user experience, ensuring intuitive navigation and seamless accessibility across devices. Typography and color schemes were carefully selected to craft a professional and inviting atmosphere that hopefully not only highlights my work but also reflects upon my creativity as a computer scientist.

### Inspiration

I derived many innovation ideas, elements, and concepts from various websites that I admire. Below are the authors/links of beautiful sites that I gained inspiration from and revere as exceptionally crafted in one facet or another:

* [Keita Yamada](https://p5aholic.me)
* [Ansub Khan](https://ansubkhan.com)
* [Anthony Fu](https://antfu.me)
* [Embed](https://astolfo.org)
* [Charles Bruyerre](https://itssharl.ee)
* [Brittany Chiang](https://brittanychiang.com)
* [Takuya Matsuyama](https://craftz.dog)
* [Mads Hougesen](https://mhouge.dk)

_I would also like to mention [Stefan Fisk's site](https://stefanfisk.com/) for originally inspiring the connection to the American Psycho business card scene._

### Figma Mock-up

The first step of development was visual design. I took to [Figma](https://figma.com) to establish potential color schemes, layouts, spacing, content, etc. [As you can see](https://www.figma.com/design/tP5ITD5rjftAeg27rMoVXG/kierancanter.dev?node-id=0-1&t=z3MOAOBTCVDuCq4r-1), the original design looks almost nothing like the final product, but it laid out the groundwork that displayed flaws and eventually allowed me to perform iterations upon iterations of refinements.

More on this in [Layout Design](#layout-design).

### Usability + UI/UX

While visual design is fun and can improve the atmosphere of an application, it's worthless if the usability is garbage. Above all else, I knew I wanted the site to be as operationally simple and obvious. A relatively large chunk of time was spent brainstorming and testing different layouts to determine what would be the best for user experience.

[Tony Alicea](https://anthonyalicea.com/) has a great book entitled [Normal UI](https://tonyalicea.dev/normalui/) that revolves around the concept of _normalization_. Derived from "data normalization," Tony frames this principle as relating to the number of screens/pages a user visits from the start to the end of their goal or task. If the task takes many screens in which each screen has few actions to carry out, he refers to it as more normalized. Conversely, a UI that typically contains many actions across a fewer number of screens is denormalized. There is no global better or worse option; the designer has to choose the better approach based on the tasks that users will complete in the software. Normalized workflows reduce the amount of information that the user is met with at each stage of their objective while denormalized workflows may be more efficient for experienced users to quickly complete tasks.

This notion of normalization was the driving force that convinced me to transition from a single page application (SPA) to a multipage, compartmentalized application. While there aren't any "objectives" for a user to complete through my site per se, locating and accessing the information can be considered the tasks themselves. With this idea, I split the site up into pages that matched each section. I restricted the page to being non-scrollable, and instead would only allow scrolling within the page's content container if it extended past the given height. I like this normalized approach better than the scrolling SPA because it contains and divides the information better than headers and sections would otherwise. Users would know exactly how to locate each section immediately without having to scroll and search through other sections to find what they're looking for.

### Colors

Colors play an extremely important part in how the audience visually perceives your content. Black and white can emit elegance while vibrant colors are more playful. Earth tones come across as more subdued but give off a natural, organic feel. Colors are also important for accessibility purposes. Designs need to ensure that contrast between opposing colors is high enough such that those with color blindness can still detect differences in overlapping colors. Believe it or not, my original color scheme was inspired by [Hyper Shadow](https://sonic.fandom.com/wiki/Super_Shadow) from Sonic. I remember being obsessed with the pale gold + burgundy combo while playing the final stage of Sonic Adventure 2: Battle as a kid, and I have loved the pairing ever since.

While exuberant as part of a video game character's design, I recognized that this combination would not appear as pleasing if it was plastered on a web page. From the start, I knew I wanted to implement a dark mode, so I decided to split the duo of colors up and use them as the accent/highlight colors for each mode. I'm a sucker for browns and tans, so I played around until I obtained a darker brown/purple that could be used as the background for the dark mode. Using this as a baseline hue, I adjusted the saturation and lightness to obtain a pale purple that I thought would fit well as the light mode background. From here, I assigned the opposite theme's background color as the hard foreground color and chose a slightly more subdued color as the soft foreground color. The hard foreground color is meant to stand out a little more and emphasize certain elements like important words while the soft foreground color is the standard color used for the majority of foreground elements. The accent color is used for links, hover effects, and miscellaneous visual flavor (bullet points, active experience indicator, etc.).

I originally was just going to stick to the light/dark mode themes, but coming across [Mads Hougesen's website](https://mhouge.dk) sparked another idea in my mind. I loved the slight injection of popping colors exhibited in the technology labels and hover effects, as well as the functional change in color on every hover of the word "Hi." I thought "how bout I keep these two primary modes and add two more 'colorful' modes, one for light and one for dark." I eventually settled on the idea to use traditional white/dark gray background's for these new modes. The soft and hard foreground colors would follow the same formula as the "subdued themes," but the accent colors would change on every load and be randomly selected from an assortment of colors that I define. I had to carefully select colors such that they appeared bright and vibrant, but they wouldn't clash too much with the background no matter what color was selected.

This presented design and logic challenges that are explained more in [Technical Challenges & Solutions](#technical-challenges--solutions), but I was determined to make it work. As an avid enjoyer of personalization within apps and games, I very much wanted to give the user the option to switch between these four different color themes. Ultimately, I chose names for these themes based on the atmosphere I felt they radiated: Plush, Sombre, Brilliant, and Luminous.

#### Color Reference

<table>
  <tr>
    <th>Theme</th>
    <th>Background</th>
    <th>Foreground (Soft)</th>
    <th>Foreground (Hard)</th>
    <th>Contrast Color</th>
  </tr>
  <tr>
    <td>Plush</td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/plush-bg.png" alt="Plush Background" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/plush-fg-soft.png" alt="Plush Foreground (Soft)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/plush-fg-hard.png" alt="Plush Foreground (Hard)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/plush-contrast.png" alt="Plush Contrast" /></td>
  </tr>
  <tr>
    <td>Sombre</td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/sombre-bg.png" alt="Sombre Background" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/sombre-fg-soft.png" alt="Sombre Foreground (Soft)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/sombre-fg-hard.png" alt="Sombre Foreground (Hard)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/sombre-contrast.png" alt="Sombre Contrast" /></td>
  </tr>
  <tr>
    <td>Brilliant</td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-bg.png" alt="Brilliant Background" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-fg-soft.png" alt="Brilliant Foreground (Soft)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-fg-hard.png" alt="Brilliant Foreground (Hard)" /></td>
    <td style="text-align: center;"><a href="#colorful-contrast-sets">See below</a></td>
  </tr>
  <tr>
    <td>Luminous</td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-bg.png" alt="Luminous Background" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-fg-soft.png" alt="Luminous Foreground (Soft)" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-fg-hard.png" alt="Luminous Foreground (Hard)" /></td>
    <td style="text-align: center;"><a href="#colorful-contrast-sets">See below</a></td>
  </tr>
</table>

#### Colorful Contrast Sets

<h4>Brilliant</h4>
<table>
  <tr>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast1.png" alt="Brilliant Rose" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast2.png" alt="Brilliant Valentine" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast3.png" alt="Brilliant Forest" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast4.png" alt="Brilliant Toolbox" /></td>
  </tr>
  <tr>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast5.png" alt="Brilliant Mustard" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast6.png" alt="Brilliant Bluish" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast7.png" alt="Brilliant Rust" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/brilliant-contrast8.png" alt="Brilliant Viridian" /></td>
  </tr>
</table>

<h4>Luminous</h4>
<table>
  <tr>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast1.png" alt="Luminous Azure" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast2.png" alt="Luminous Banana" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast3.png" alt="Luminous Lavender" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast4.png" alt="Luminous Lime" /></td>
  </tr>
  <tr>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast5.png" alt="Luminous Mandarin" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast6.png" alt="Luminous Mint" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast7.png" alt="Luminous Peach" /></td>
    <td style="width: 100px; height: 100px;"><img src="public/colors/luminous-contrast8.png" alt="Luminous Watermelon" /></td>
  </tr>
</table>

### Typography

I carefully chose my typefaces to emit a clean, modern, and professional feel while also providing a robust selection of weights and styles. For Serif, Sans-serif, and Monospaced usage, I elected to use the [IBM Plex](https://www.ibm.com/plex/) family of fonts. For the minimal presence of [_American Psycho_-inspired](https://www.youtube.com/watch?v=YHgwxVCiMyI) small-caps, I opted for the Spectral SC font.

| Google Fonts                                                       | Adobe Fonts                                                    |
|--------------------------------------------------------------------|----------------------------------------------------------------|
| [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)   | [IBM Plex Sans](https://fonts.adobe.com/fonts/ibm-plex-sans)   |
| [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) | [IBM Plex Serif](https://fonts.adobe.com/fonts/ibm-plex-serif) |
| [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)   | [IBM Plex Mono](https://fonts.adobe.com/fonts/ibm-plex-mono)   |
| [Spectral SC](https://fonts.google.com/specimen/Spectral+SC)       | [Spectral SC](https://fonts.adobe.com/fonts/spectral-sc)       |

### Logo

To fully solidify myself as a branded entity, a logo was a necessity. I drafted numerous ideas on paper and gathered opinions from friends & family to decide which one to move forth with. Having selected a base design, I crafted and refined it in Adobe Illustrator over several attempts and variations.

To act as the favicon, the logo was exported as an SVG for desktop and Progressive Web App (PWA) purposes. To further enhance responsiveness, the logo was also exported as a PNG in two different color schemes (for light/dark modes) and many sizes (16x16px, 32x32px, 512x512px, Android - 180x180px, and Apple - 192x192px) to serve as fall-backs should the SVG files run into any issues. More variants of the logo were exported for uses like this README and the business card element.

Furthermore, I exported a canonical version of the logo using the Sombre colors for official uses like this README. Finally, a thumbnail of the business card was added for preview purposes.

### Prototyping

To mock-up more technical aspects of the site, I shifted to [CodePen](https://codepen.io). This is where I toyed around with conceptual prototypes of possible components and drafted the HTML/CSS/JS in a more abstracted environment. View some of my [early creations](https://codepen.io/kierancanter).

## Development

### Text Editor

The entire project was written within [Cursor](https://www.cursor.com/). If you're unfamiliar, Cursor is a fork of VSCode that brilliantly and natively integrates AI-powered operations like tab autocompletion, LLM chats, a natural-language code composer, and more. Since it is a VSCode fork, it will be visually familiar to previous VSCode users and has all the base features from it as well. You can even import all of your VSCode extensions, settings, profile, etc. Just as VSCode was the catalyst for migrating tons of users from Vim or Nano, I believe Cursor will have the same effect with migrating users from VSCode.

### Tech Stack

The core technology stack I employed consisted of [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), [Next.js](https://nextjs.org/), and [Tailwind CSS](https://tailwindcss.com/). Coincidentally, these are all a part of the [T3 stack](https://create.t3.gg/) by [Theo Browne](https://www.youtube.com/@t3dotgg). I discovered this tool after the project was already in development, and while it's not inspired or based on the stack, I do believe it to be the most modern, modular, and effective starting point for creating full-stack applications for the majority of use-cases.

#### [TypeScript](https://www.typescriptlang.org/)

As we know, JavaScript is the number one language used in web development, and for good reason. It's ubiquitous across the web, extremely versatile, has a massive ecosystem and community support, and has exceptional cross-platform compatibility. Despite all these positives, it does have one large flaw: **dynamic typing**. While dynamic typing can be useful for quick prototyping, projects with limited scopes, or handling unknown data structures, there are a slew of run-time and logic errors that developers will deal with when writing in a dynamically typed language. TypeScript catches these errors early at compile-time.

TypeScript completely solves this flaw. Acting as a statically-typed superset of JavaScript, it facilitates type-safe programming and extends its functionality. Since it's not an entirely different, standalone language, it ends up compiling down to normal JavaScript and is compatible with any libraries, infrastructures, or packages previously supported by JS.

TypeScript is such an improvement over JavaScript that there really aren't any realistic reasons to not opt for it other than rapid prototyping.

#### [React](https://react.dev/)

The same component-based UI library that was famously part of the MERN stack is still one of the best choices for developing SPAs and mobile applications. Virtual DOM, JSX, hooks, not much else needs to be said.

#### [Next.js](https://nextjs.org/)

Developed by [Vercel](https://vercel.com/), Next.js is one of the most popular, industry-standard frameworks for creating React applications. With server-side rendering (SSR), and static site generation (SSG), it can greatly improve performance and search engine optimization (SEO). The ability to create backend API routes can eliminate the need for a separate backend while other features like automatic code splitting, fast refresh, and image-optimization contribute to improvements in reload times and overall performance.

#### [Tailwind CSS](https://tailwindcss.com/)

Commonly confused with being an alternative to Bootstrap, Tailwind CSS is a CSS framework (not a library) that provides reusable utility classes to help developers build custom designs without the need for custom CSS. Used inline within HTML (or JSX), the utility-first approach enabled rapid development and improves efficiency by mitigating the need to leave the markup and coordinate with separate CSS files. It's extendable, highly customizable, and promotes responsive design by the inclusion of breakpoint classes. Although it's designed to prevent the need for large-scale CSS, custom CSS classes can still be assembled with native CSS and/or Tailwind utility classes.

#### Other Libraries

In addition to the core pieces of the stack, I took advantage of various other packages to implement certain features:

* [Vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/)          - 3D tilt library used for the business card element on desktop devices
* [Font Awesome](https://fontawesome.com/)                             - wildly popular icon library used for most of the iconography
* [GSAP](https://gsap.com/)                                            - animation library used for the pop-in animations on load
* [Embla Carousel](https://www.embla-carousel.com/)                    - lightweight carousel library for mobile page-swiping feature

### Component Design

#### Encapsulation + Abstraction

Encapsulation is the object-oriented programming (OOP) principle that promotes self-containment of and compartmentalization of objects/components. This is quite valuable for reusability, Don't Repeat Yourself (DRY) coding, and exhibiting a separation of concerns, especially for a component-based library like React. By isolating UI elements, utility components, and text data, debugging is made easier by making components responsible for smaller portions of functionality and fosters modularity by allowing components to be reused across the project.

Abstraction is another OOP principle that hides the details of implementation and focuses on broader ideas. By removing the specifics and focusing on the features, efficiency improves and complexity decreases.

For example, the text data present in the About, Experience, and Works sections is not hard-coded into the components themselves, but abstracted out into their own files. The component retrieves this text data and inserts it into its proper location. This makes revising, editing, and adding more of the same component easier as well as simplifying the code by hiding the irrelevant information. This is all very beneficial with respect to scaling.

Encapsulation can be seen with the segregation of the utility files. To make repeating the same action over and over again (like applying the reveal animation to an element), it's contained within a separate file and function such that it can be imported and used elsewhere in the project without limiting it to a single component or repeating the same functional code multiple times.

#### Theme Context

The theme context component (the non-visual model) is used throughout the project to control the color theme. It's responsible for initializing the theme on load with the last used theme (or a theme according to the system preferences of the user if no last theme was saved) and setting the theme when it's changed. In conjunction with the theme switcher component (the interactive controller), the theme is able to switch between four different options with a randomized color feature implemented in only the "colorful" themes. This is another example of encapsulation.

#### File Organization

When working with a project that becomes rich in files and directories, organization is paramount in avoiding the "needle in a haystack" dilemma. If your file structure is a jumbled mess with no structure, components and functions are much harder to find. I adhered to a strict hierarchical organization to maintain a separation of concerns and group related files where assets like fonts and images are stored in `public` and all source code is stored in `src`.

`src/`

* `app/`        - top-level files relating to the deployment and rendering of the site
* `components/` - visual elements that are incorporated into the page and will be seen by the user
* `context/`    - components relying on and controlling variables relating to the system context (i.e. theme context with system preferences)
* `data/`       - specific info such as text data that's abstracted out from respective components for modularity and scalability
* `styles/`     - CSS styling
* `util/`       - utility components with no visual qualities that serve a repeated purpose across multiple components

## Responsiveness & Accessibility

### Responsive Design

As stated previously, a key focus throughout this project was adhering to responsive design. Fine polish and attention to detail are apparent in a site's ability to function and display properly across all devices and platforms.

#### Metadata

Metadata can sometimes be overlooked by developers, but can contribute greatly to responsiveness and even search engine optimization (SEO).

For one, the site's favicon is what the user constantly sees and associates with the site itself. It's the icon that's used for the site in different representational contexts, such as the browser bar, bookmarks, mobile home screen, etc. By defining several sizes/colors and using different file types, the favicon is sure to appear clear for all users. I made sure to create SVGs, PNGs, sizes from 16x16px to 512x512px, and separate files for light and dark mode.

Another example is the existence of a web manifest file. This is a JSON file that defines metadata associated with the progressive web app (PWA) version of the website, that is, the feature on most mobile devices that allows the user to add a website as a simple application on their home screen. While not game-breaking if absent, supporting the PWA feature illustrates a complete design and may improve the experience of users that take advantage of the feature. I ensured all relevant information was defined here such as the PWA icon, theme/background color, categories, etc.

The thumbnail image is used for the preview of the site across the web such as on social media sites or in search engine results. It's displayed in the same way as the favicon, so it's important to maintain a consistent look and feel. The thumbnail is the standard size of 1200x630px.

Finally, the viewport can contribute greatly to the look and feel of a site. By restricting the user's ability to scale the viewport and setting the height/width equal to that of the screen, user-caused errors that may have negative effects on the display of the site are mitigated.

#### Flexboxes

The flexbox is my personal favorite display type for the vast majority of elements. Flexboxes promote flexible and simple layouts by allowing dynamic sizing, reordering, and providing alignment options. The need for float-based layouts is greatly reduced. Flexboxes are not ideal for 2D layouts of components (opt for a grid display in that case), but there are very few instances where a flexbox could not simplify and replace the use of a block or inline-block element.

#### Mobile-first Design

A common methodology and best practice for modern application development is mobile-first design. As the name suggests, due to the prevalence of mobile devices in the modern day, this is the notion that the developer should construct their application with preference towards mobile devices, layouts, and functionality, and adapt the design to larger devices in succeeding revisions.

Dynamic length units are crucial for facilitating mobile-first design by scaling sizes according to the system. Dynamic screen lengths (dvh/dvw) and dynamic sizing units (em/rem) should be preferred over fixed units like pixels (px) as much as possible. On mobile web browsers like Chrome or Safari, the dynamic screen height would refer to the space in-between the address bar at the top and the navigation bar (navbar) at the bottom. This height is dynamic because it grows or shrinks as the bars disappear or reappear as a result of swipe gestures. By making font sizes dynamic with em (resizes according to parent) or rem (resizes according to root) units, text can change sizes depending on the user's system setting.

Breakpoints are a massive help for adhering to mobile-first design by defining screen widths that allow the developer to adjust their app's layout depending on the device size. They're extremely useful for adjusting margins/padding, height/width, text size, and even the order of elements. In my own implementation, I took advantage of Tailwind's built-in breakpoints, but these can be altered in the `tailwind.config.js` file. Breakpoints can be set in vanilla CSS by specifying properties under a screen size [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).

The default breakpoint sizes used in this project are:

| Device Type | Minimum Width |
|-------------|---------------|
| Small       | 640px         |
| Medium      | 768px         |
| Large       | 1024px        |
| Extra Large | 1280px        |

While these sizes are most commonly associated with phones, tablets, laptops, and desktops, respectively, it's important to keep in mind that some devices may fall into another category, especially a mobile device flipped to landscape.

### Device-specific Functionality

As mentioned before, the business card element was heavily inspired by the [business card scene from American Psycho](https://www.youtube.com/watch?v=YHgwxVCiMyI). I knew I could implement visual and interactive flavor to give the element a little more character. After playing around in CodePen and deciding to use a tilt effect, I realized I would have to also decide how the user interacts with it on different devices.

On desktop (mouse-controlled devices), I liked the concept of the card tilting when the user hovered over it. I streamlined this functionality with [Vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/); however, mobile users don't have mice. I had to think of another interactive function that they could take advantage of. After some brainstorming, I settled on the idea to use the device's gyroscope data to tilt the card as if it were a 3D object they were holding in space; however, due to permission issues, I went in a different direction. A more mobile-friendly tilt effect was incorporated on touch devices such that up-swipes focus the card and allow the user to drag the rotation of the card without interfering with the carousel or refresh gestures. More on this problem in [Mobile vs. Desktop Business Card](#mobile-vs-desktop-business-card).

Another notable accommodation I had to bear in mind was the size and location of the theme switcher and header component. On desktop, it makes sense for the user to click a checkbox to toggle a button, but with touch devices, the buttons should be much larger due to the reduced precision of tapping a screen versus using a mouse. The locations also had to be altered such that every device size displayed a different layout. On small devices, the header is centered at the top with the theme switcher in the bottom right. On tablets, the header is aligned to the top left with the theme switcher aligned to the top right. Finally, with larger screens, the header is centered at the top with the theme switcher aligned to the top right.

One final difference in mobile vs. desktop functionality is the swipe feature exclusive to mobile devices. To make the app more mobile-friendly and feel like a mobile app, I implemented a page-swiping feature that allows the user to swipe left or right to navigate between sections across a carousel component. To facilitate this, I encapsulated the desktop navigation and mobile navigation within separate components. This feature was made possible by the [Embla Carousel](https://www.embla-carousel.com/) library and forfeits the interactivity of the particle field seen on desktop.

These considerations are crucial in guaranteeing a consistent and polished user experience.

### Accessible Design

In tandem with responsive design, accessible design makes certain that those with deficiencies and disabilities can enjoy your website as anybody else would. Aside from ethical responsibilities, accessible design can also improve user experience, SEO, and help reach a broader audience. To confirm the quality of accessibility, I used three different site quality auditing tools: [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [deque axe Auditor](https://www.deque.com/axe/auditor/), and [WAVE](https://wave.webaim.org/). These tools are not meant to guilt you into achieving that 100% rating or score, but rather to help you identify areas of improvement. It's your job as the developer to decide what are reasonable accessibility, performance, best practice, and SEO additions. Not all the suggestions will be necessary, and the returns diminish the more your score improves.

#### ARIA

Accessible Rich Internet Applications (ARIA) is a set of attributes defined by the Web Accessibility Initiative (WAI) specification to enhance the accessibility of web content. By implementing ARIA labels, roles, and live regions, assistive technologies can effectively parse and translate information and visuals from an application. ARIA labels provide descriptive details for a component that might otherwise lack clear context. ARIA roles define the purpose or type of element, useful for custom or non-semantic element tags. ARIA live regions notify assistive technologies about live updates that may not be perfectly apparent.

I incorporated ARIA labels and roles into as many applicable elements as possible. There are no dynamic updates conducted throughout the course of a user's visit to my site, so live regions are not quite applicable, but they're important to keep in mind in the case of notifications or error prompts.

#### Semantic HTML

Semantic tags are a bit underrated and sometimes neglected. Inherent meaning and detail is associated with semantic tags that can greatly help assistive technologies. Tags like `<header>`, `<main>`, `<footer>`, `<nav>`, and `<section>` define page structure, `<button>` can be used for clickable components, and `<label>`/`<input>` is useful for forms. It's best to avoid `<div>` and `<span>` for interactive elements. While I used many `<div>` tags for miscellaneous containers, I focused on using semantic tags where applicable.

#### Color Contrast

To expand on what I said earlier regarding color theory, the contrast and visibility of colors is pertinent for those that can't make out colors easily. For this reason, I carefully chose colors for my themes that contrasted well enough, but also varied in saturation and light depending on whether content needed to be emphasized or to blend in. This was especially true for the Brilliant and Luminous color themes, where I created sets of colors to randomly select from and apply to accented elements. I ensured that all colors contrasted with their light/dark backgrounds with a minimum ratio of 3 using [Contrast Finder](https://app.contrast-finder.org/).

#### System Preferences

Abiding by a user's system preferences is a spectacular way to make your application feel a little more personal. By utilizing a user's own light/dark mode or reduced motion preferences, the application is intertwined with the rest of their system or device more. I made sure the color theme defaulted to the user's system preference if a cached value did not already exist, and removed animations/effects from elements in the case of a reduced motion preference.

## Technical Challenges & Solutions

### Spatially Partitioned Particle Field

After concluding that I'd go forth with an interactive particle field background, I implemented a solution that created a grid of particles (small dot-like objects) who's positions were compared against the cursor's on every frame while the mouse is over the field. As I continued development, I noticed the movement of the particles start buffering and skipping a little. The performance wasn't hindering or an eyesore, but it wasn't quite smooth. Instead of the "force-field" following the mouse like a snake, it looked more like bubbles that were popping up under the mouse several times a second.

Unsurprisingly, comparing thousands of objects to the mouse position every run is performance-intensive. I knew I could improve this. After researching ideas, I came upon the technique of "spatial partitioning." This is the practice of dividing a space into smaller subspaces to reduce the complexity of spatial queries. To incorporate this into my particle field, I divided the total area into a grid of cells that I could control by a simple variable. This way I could try different sized cells and see what works the best. The idea is instead of matching the cursor position against all the particles at once, we can match it against particles contained only within the cell it's currently in, significantly improving performance by minimizing the amount of irrelevant comparisons being made.

The smaller the cell size, the better the performance, and vice versa; however, there was a flaw with this optimization. When the cursor is moved slowly across the particle field, the user may notice particles line up against the side of a cell like an asymptote. The visibility of the imperfection gets more apparent as the cell size gets smaller, and vice versa. Because of this, I experimented with numerous cell sizes to end up with a value that seemed to strike a favorable balance between performance and this visual blemish, which ended up not being very noticeable unless the user is intentionally looking for it.

I created a test to run a "synthetic mouse" around in a circle for ten seconds to facilitate a completely even and fair environment for both solutions. Gathering multiple data points surrounding particle update time (the time it takes for a particle to react to the mouse entering its vicinity), I discovered that my optimization resulted in an improvement on the average particle update time by 27.8%.

Visuals of the test and related metrics can be seen below:

<div style="display: flex; justify-content: flex-end; align-items: center; gap: 10px; max-width: 1000px; margin: 0;">
  <div>
    <h3 style="text-align: center;">Unoptimized</h3>
    <img alt="Particle Field Unoptimized" src="public/particle-field/particlefield-unoptimized.gif" width="500" height="auto" style="width: 100%; height: auto; object-fit: contain;" />
  </div>
  <div>
    <h3 style="text-align: center;">Optimized</h3>
    <img alt="Particle Field Optimized" src="public/particle-field/particlefield-optimized.gif" width="500" height="auto" style="width: 100%; height: auto; object-fit: contain;" />
  </div>
</div>

| Metric              | Unoptimized | Optimized | Improvement  |
|---------------------|-------------|-----------|--------------|
| Average Update Time | 12.89ms     |  9.31ms   |  27.8%       |
| Maximum Update Time | 43.30ms     | 18.80ms   |  56.7%       |
| Minimum Update Time |  6.10ms     |  6.80ms   | -11.5%       |
| Variance            | 37.20ms     | 12.00ms   |  67.8%       |

As you can see, the overall performance was vastly improved. With a reduction in average update time of 27.8%, the particle field now runs much smoother and more efficiently. While the minimum update time seemed to decrease, this may be explained by uncontrollable hardware factors like memory access patterns and CPU scheduling. The maximum update time drastically improved by 56.7%, and the variance by 67.8%. This means that the particle field is now more consistent and predictable.

**01/09/2025:** To increase accessibility and promote better minimalism, I've reduced the interactivity of the particle field to activating only while the primary mouse button is pressed. As such, the feature still exists as a unique interaction, but it's not as intrusive or distracting to those with motion sensitivities.

### Theme Switcher

The theme switcher component was one that I battled with while choosing the best design. I considered several solutions to swap between four themes:

* Dropdown menu
* Toggle button per theme (this was actually used in the earliest implementation of the site)
* Toggle button per mode (dark/light mode and subdued/colorful mode)
* Multi-state button (single button that cycles through themes)
* Radio buttons
* Four-segment slider

Ultimately, I selected the dual button option. Using toggle buttons to change the color theme seemed the most intuitive, and confining the implementation to two buttons instead of four allowed for a more compact design without sacrificing ease-of-use or self-evidence. The buttons would operate like a two-bit counter, where each button is a bit to supply four total options e.g. 00, 01, 10, and 11; one bit to swap between light and dark mode, and one bit to swap between subdued and colorful mode.

Deeper into development, more challenges presented themselves when I chose to randomize the accent colors associated with the colorful modes. I had to figure out a way to not only dynamically set the CSS properties associated with the accent color, but part of my design also included a separation between the normal accent color (used for headings, links, theme name, etc.) and the randomized set of colors used for other elements (bullet points, technology badges, etc.). I solved these by writing [`colorfulSetter.ts`](https://github.com/kicanter/kierancanter.dev/blob/main/src/util/colorfulSetter.ts).

Within this file, I defined the two sets of colors to be used for either Brilliant or Luminous. These colors had to be carefully selected to guarantee visibility and contrast between them and the background colors. In addition, two functions were conceived to do all the legwork. The first `getContrastColor()` is responsible for dynamically selecting a random color from the set when the theme changes to a colorful mode. To prevent a color from consecutively being repeated, it's excluded from the set of colors to choose from. This function is run in `themeContext.tsx` whenever the theme is set to Brilliant or Luminous. Because the colors are supposed to change for each element, the second function `generateAccentColor()` is meant to be called when setting the accent color on each one. If the theme is Plush or Sombre, nothing is done. If the theme is Brilliant or Luminous, `getContrastColor()` is called to select a new random color that excludes the accent color selected in the theme context.

This solution effectively sets a random color for the main accent and selects from the rest of the set to repeat as secondary accent colors.

### Mobile vs. Desktop Business Card

As I previously touched on in [Device-specific Functionality](#device-specific-functionality), an importance was placed on making sure the trademark business card element functioned well on all devices. I actually ran into this problem for the first time while testing my website on mobile after incorporating the tilt effect. I noticed that the tilt didn't quite follow my touch gestures and instead only responded to taps, which it did very snappily. To resolve this, the mobile and desktop device implementations were divided into two different executions. Instead of trying to mimic the desktop feature on mobile, I wanted to appeal to users of both devices independently and facilitate the best experience possible (not dissimilar to the concept of writing separate Kotlin and Swift codebases for mobile applications on Android and iOS, respectively).

After much documentation sifting, researching, and testing, I had assembled a tilt feature using the mobile device's gyroscope and orientation data to tilt the card along the same axis as the device. I handled the case of orientation changing by resetting the card's tilt origin to the tilt of the phone at the moment of orientation change. I also set a larger ceiling for maximum rotation compared to the desktop version to further perpetuate the feeling of holding a physical card with your phone or tablet.

Thorough testing of this feature exposed an issue with iOS compatibility. Applications and websites must be given permission to access gyroscope/orientation data, and it doesn't even prompt the user to do so. User's have to search around for the setting to have apps prompt to access this data. To avoid alienating a large portion of mobile users, I fell back to another mobile-friendly tilt approach. The user can swipe up on the card and hold drag to rotate the card around a 15° ceiling. To avoid interference with the carousel swiping and refresh gesture, the user must swipe up to focus in on the card.

Tending to this issue taught me a lot about adapting to the nuances of device-specific functionality to optimize user experience.

### Layout Design

As seen from my original [Figma design](https://www.figma.com/design/tP5ITD5rjftAeg27rMoVXG/kierancanter.dev?node-id=0-1&t=z3MOAOBTCVDuCq4r-1), my ultimate release looks far different from my original draft. I was quite convinced and confident in my scrollable, heading separated design, but after being exposed to more sites and ideas, I lost that assurance. It wasn't until I saw [Keita Yamada's website](https://p5aholic.me) that I realized there are truly no rules to this design thing. There are some best practices and definitely some dos and don'ts, but there are an infinite number of ways to design something to accomplish a task, and luckily my task was pretty simple.

I thought about the user experience more and realized "maybe I don't even want the user to have to scroll to find my sections and have other content clogging the viewport." Choosing to segregate sections by heading, content needed to remain scrollable in the event that it extends past the screen, but only the content of that section needed to be scrollable, not the entire page. This way, users didn't even get the chance to be distracted by content unrelated to what they wanted to see. Finding the desired section is quick, efficient, and effortless.

By the time I decided to completely revamp my website, I had almost already finished the core implementation (as seen in this [commit](https://github.com/kicanter/kierancanter.dev/commit/6c8fc4d81e86e1f25054fe7d7fe69ef179ccbf5a)), but in the end it was completely worth it to produce a more refined result.

### Colorful Bullet Points

Such a minor detail became such an arduous task, but my unwavering and meticulous attention to detail would not let it rest until it was fixed. Due to some CSS language-specific complexities, my `generateAccentColor()` function experienced an inconsistent logic error. On some platforms, namely desktop (Chrome/Firefox/Edge) and iOS devices (Safari), the function performed beautifully and assigned random vibrant colors to the bullet points in my About section. When tested on my physical Android device, as well as numerous other virtual and physical Android devices (Chrome), the bullet points appeared in a bright red, as if it was a default fallback color of some sort.

This discrepancy perplexed me, and no matter what bullet applying technique I tried, nothing worked. I changed raw CSS, Tailwind properties, `::before` pseudo-elements, the `list-style-image` property, and the `content` property. After many failed attempts, I decided the best plan of action to take was to implement an entire bullet point component.

With the feeling of completely exhausting all of my options, I create a component specifically to hold an SVG of a diamond that I wanted to use as the bullet and gave it `String` prop to define the fill color. This was the only critical variable needed for the SVG because while I didn't need to adjust the size of the SVG at all when inserted into my text, I could scale with `transform` if I needed to in the future.

Using this method, I was able to insert this component into my list element seamlessly and treat it like a bullet point, generating the proper accent colors at all times. This solution didn't match my ideal desire, but it was the only one I could test and ensure consistent performance on all devices.

## Infrastructure

To the average programmer with no previous website hosting experience, the process of getting a site up and running can be arduous, confusing, and difficult. You are not alone if you relate to that struggle, and there was much trial & error and failures in my attempts to do so. Below are the various platforms I used for the DevOps side of things.

* _.com_ domain is registered with [AWS Route 53](https://aws.amazon.com/route53/) and _.dev_ domain is registered with [PorkBun](https://porkbun.com/) (.com → .dev redirection through [Vercel](https://vercel.com/))
* SSL certificate issued by [Let's Encrypt](https://letsencrypt.org/) through [PorkBun](https://porkbun.com/)
* Hosted on [AWS Route 53](https://aws.amazon.com/route53/)
* Mail domain/service through [PurelyMail](https://purelymail.com/)
* Business phone number through [Google Voice](https://voice.google.com/)
* CI/CD with [GitHub Actions](https://github.com/features/actions) + [Vercel](https://vercel.com/)
* Analytics tracking through [Umami](https://umami.is/) using [Supabase](https://supabase.com/) hosted on [Vercel](https://vercel.com/)
