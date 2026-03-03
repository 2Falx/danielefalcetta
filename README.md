# Daniele Falcetta - Personal Website

[![Live Website](https://img.shields.io/badge/Live-danielefalcetta.github.io-blue?style=flat-square)](https://2falx.github.io/danielefalcetta/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Modern, responsive personal website showcasing my research in Deep Learning and Medical Imaging.

## 🌐 Live Site

Visit my [website](https://2falx.github.io/danielefalcetta/)!

## ✨ Features

- **Fully Responsive** - Optimized for all devices and screen sizes
- **Smooth Animations** - GPU-accelerated animations for 60fps performance
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Dark Mode** - Toggle between light and dark themes
- **Accessible** - WCAG 2.1 compliant with keyboard navigation
- **Fast Loading** - Optimized assets and lazy loading

## 🛠️ Built With

- **HTML5** - Semantic markup with Schema.org structured data
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** - No frameworks, pure performance
- **AOS** - Animate on Scroll library for smooth reveals
- **Font Awesome** - Icon library

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive features
├── favicon.ico         # Website favicon
├── favicon-16x16.png   # Favicon variants
├── favicon-32x32.png
├── apple-touch-icon.png
├── manifest.json       # PWA manifest
├── CV.pdf             # Downloadable CV
├── profile.jpg        # Profile picture
└── images/
    ├── og-image.png   # Social media preview
    └── erc.png        # ERC logo
```

## 🚀 Local Development

1. Clone the repository:
```bash
git clone https://github.com/2Falx/danielefalcetta.github.io.git
cd danielefalcetta.github.io
```

2. Open with a local server (recommended):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# VSCode Live Server
# Right-click index.html → Open with Live Server
```

3. Visit `http://localhost:8000` in your browser

## 📝 Content

The website includes:
- **About** - Brief introduction and research focus
- **Experience** - Educational background and work history
- **Projects** - 6+ research projects with links
- **Publications** - 7+ peer-reviewed papers (2 MICCAI 2025 Early Acceptances)
- **Presentations** - Conference talks and seminars
- **Awards** - Academic achievements and recognitions
- **Contact** - Multiple ways to get in touch

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
}
```

### Content
Update information directly in `index.html` or modify `script.js` for dynamic content.

### Animations
Adjust timing and effects in `styles.css`:
```css
transition: all 0.3s ease;
animation-duration: 0.6s;
```

## 🌐 Deployment

This site is deployed using **GitHub Pages**:

1. Repository name: `danielefalcetta.github.io`
2. Branch: `main`
3. Auto-deploys on push to main branch

### Custom Domain Setup
If using a custom domain:
1. Add `CNAME` file with your domain
2. Configure DNS records at your registrar
3. Enable HTTPS in repository settings

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🆕 Recent Updates (Summary of New Features)

- **Interactive Project Pipelines**: Project cards are now clickable — clicking a card (not just an icon) opens a centered pipeline modal showing the project's architecture image. The modal is a body-level element for robust viewport centering and accessible close controls (click outside, Escape, close button).
- **Improved Mobile UX & Touch Targets**: Spacing and touch target sizes for Toolbox, Skills, Timeline and other interactive areas were increased; carousels and buttons have better touch handling and swipe velocity detection.
- **Carousels — Click to Center & Clone-Safe Translations**: Collaborations and Presentations carousels support click-to-center behavior. The implementation uses clone-safe mapping so cloned carousel cards (for infinite-scroll) receive correct translations and clicking them centers the original item.
- **Presentations Modal Behavior**: Presentation cards center on click and open an embedded presentation modal (iframe) with title and external link. The modal preserves expected behaviors (close on Escape, clicking outside, stop iframe on close).
- **Bilingual Content & Language Switcher Fixes**: Full English/Italian support added across nav, hero, about, timeline, projects, awards, collaborations, presentations, and footer. The language switcher now preserves HTML emphasis (uses `innerHTML` for About paragraphs) and updates cloned carousel nodes to avoid translation glitches.
- **Content & Emphasis Updates**: Hero and About sections were updated with new copy for the 'Data-Efficiency' framing and now include emphasized phrases (`<strong>`) in both EN/IT for better readability.
- **Layout & Styling Tweaks**: Central container max-width increased, larger desktop card sizes for Toolbox/Skills/Timeline, and refined animations for smoother, less jumpy transitions.
- **Accessibility & Performance**: Continued focus on keyboard navigation, ARIA-friendly modals, optimized event handling (debounce/throttle), and lazy-loading assets to keep Lighthouse scores high.
- **Developer notes**: Key interactive logic lives in `script.js` (translations object, carousels, modals, language switcher). If you clone the repo, run a local server and test both languages and mobile breakpoints. See the `script.js` comments for implementation details.

  
## 🔧 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Optimized images** with proper formats and sizes
- **Minified CSS/JS** for production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Daniele Falcetta**

- Website: [danielefalcetta.github.io](https://danielefalcetta.github.io)
- GitHub: [@2Falx](https://github.com/2Falx)
- LinkedIn: [danielefalcetta](https://linkedin.com/in/danielefalcetta)
- Google Scholar: [Profile](https://scholar.google.fr/citations?user=4LHNCl0AAAAJ&hl=en)
- Email: daniele.falcetta228@gmail.com

## 🙏 Acknowledgments

- Sorbonne Université & EURECOM for research support
- Open source community for tools and libraries
- Colleagues and mentors for continuous feedback

---

**Built with 💙 and ☕ by Daniele Falcetta, PhD**  
*AI Researcher in Deep Learning & Medical Imaging*
