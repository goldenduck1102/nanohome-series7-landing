import Image from "next/image";
import Link from "next/link";
import { ProductCardWishlistButton } from "@/components/catalog/product-card-wishlist-button";
import { lpeSeriesSevenColours, lpeSeriesSevenGallery, lpeSeriesSevenProducts } from "@/lib/content/lpe-series-seven";
import type { Locale } from "@/i18n/routing";
import { getLpeSeriesSevenCopy } from "./lpe-series-seven-copy";
import { LpeSeriesSevenGallery } from "./lpe-series-seven-gallery";
import styles from "./lpe-series-seven.module.css";

const campaignDestination = "https://nanohome.vn/products?q=Series+7+ash";
const asset = (file: string) => `/images/campaigns/lpe-series7/${file}`;
const iconDimensions: Record<string, [number, number]> = {
  "6b301.svg": [31, 30], "5b53b.svg": [20, 30], "53c0c.svg": [30, 30],
  "2d668.svg": [23, 26], "15e0b.svg": [30, 24], "882d4.svg": [28, 27],
  "07c46.svg": [18, 17], "d0d17.svg": [18, 18], "3a33d.svg": [18, 18],
};
function Icon({ file, size = 34 }: { file: string; size?: number }) {
  const [width, height] = iconDimensions[file];
  return <span className={styles.icon} style={{ width: size, height: size }}><Image src={asset(file)} alt="" width={width} height={height} /></span>;
}
function Arrow() { return <Image src={asset("e3c08.svg")} alt="" width={14} height={12} className={styles.arrow} />; }

export function LpeSeriesSeven({ locale, ended }: { locale: Locale; ended: boolean }) {
  const c = getLpeSeriesSevenCopy(locale);
  return <article className={styles.page} data-testid="lpe-series-seven">
    <section className={styles.hero} aria-labelledby="series-seven-title">
      <Image className={styles.backdrop} src={asset("c9b7c.png")} alt="" fill sizes="100vw" priority />
      <div className={styles.heroWash} />
      <div className={styles.heroCopy}>
        <p className={styles.brand}>FRITZ HANSEN</p>
        <h1 id="series-seven-title">Series 7<sup>™</sup></h1>
        <p className={styles.subtitle}>{c.subtitle.map(line => <span key={line}>{line}</span>)}</p>
        <p className={styles.intro}>{c.intro.map(line => <span key={line}>{line} </span>)}</p>
      </div>
      <div className={styles.offer}>
        <p>{ended ? c.ended : c.offer}</p>
        {!ended && <div className={styles.offerGraphic}><Image src={asset("67eaa.png")} alt="35%" width={1792} height={768} priority /></div>}
        {!ended && <span className="sr-only">{c.eligibility}</span>}
      </div>
      <a className={styles.cta} href={campaignDestination}>{c.explore}<Image src={asset("186a2.svg")} alt="" width={20} height={20} /></a>
      <Image className={styles.underline} src={asset("48a1f.svg")} alt="" width={208} height={24} />
      <Image className={styles.shadow} src={asset("cf88c.svg")} alt="" width={283} height={35} />
      <div className={styles.heroChair}><Image src={asset("99efb.png")} alt="Series 7 Colour Ash Light Beige, chân thép mạ chrome" fill sizes="(max-width: 640px) 65vw, 390px" priority unoptimized /></div>
      <div className={styles.benefits}>
        {c.benefits.map(([title, body], i) => <div key={title}><Icon file={["6b301.svg", "5b53b.svg", "53c0c.svg"][i]} /><p>{title}<br />{body}</p></div>)}
      </div>
    </section>
    <div className={styles.services}>
      {c.services.map(([title, body], i) => <div key={title}><Icon file={["2d668.svg", "15e0b.svg", "882d4.svg"][i]} size={32} /><p><strong>{title}</strong>{i === 0 ? <time dateTime="2026-10-17">{body}</time> : <span>{body}</span>}</p></div>)}
    </div>
    <section className={styles.colours} aria-labelledby="series-seven-colours">
      <div className={styles.colourHeading}><div><p className={styles.eyebrow}>SERIES 7</p><h2 id="series-seven-colours">{c.colours}</h2></div><a className={styles.textLink} href={campaignDestination}>{c.all}<Arrow /></a></div>
      <div className={styles.colourRail}>{lpeSeriesSevenColours.map(product => <Link href={campaignDestination} key={product.slug}><div><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 28vw, 15vw" /></div><span>{product.name.toUpperCase()}</span></Link>)}</div>
    </section>
    <div className={styles.spaces}>
      {["6a702.png", "1cd52.png", "93166.png"].map((file, i) => <a key={file} href={campaignDestination} className={styles.space}>
        <Image src={asset(file)} alt={c.spaces[i]} fill sizes="(max-width: 640px) 100vw, 33vw" /><div className={styles.spaceGradient} /><div className={styles.spaceCaption}><strong>{c.spaces[i]}</strong><span>{["DINING", "LIVING", "DESIGN DETAIL"][i]}</span></div><span className={styles.spaceArrow}><Image src={asset("186a2.svg")} alt="" width={20} height={20} /></span>
      </a>)}
    </div>
    <section id="selection" className={styles.selection} aria-labelledby="series-seven-selection">
      <p className={styles.eyebrow}>SERIES 7 — COLOUR ASH</p><h2 id="series-seven-selection">{c.selection}</h2>
      <div className={styles.products} data-testid="lpe-product-grid">
        {lpeSeriesSevenProducts.map(product => <div className={styles.card} key={product.slug}>
          <div className={styles.cardMedia}>
            {!ended && <span className={styles.badge} title={c.eligibility}>−35%</span>}
            <ProductCardWishlistButton variant="included" label={`${c.save}: ${product.name}`} testId={`lpe-save-${product.slug}`} item={{ name: product.sourceName, slug: product.slug, primaryImage: product.image, brand: { name: "Fritz Hansen", slug: "fritz-hansen" }, classificationText: "Series 7", priceLabel: product.priceLabel, priceValue: product.priceValue, badgeClassName: null, badgeLabel: null, isCartEligible: false }} />
            <Link href={campaignDestination} aria-label={product.sourceName}><Image src={product.image} alt={product.sourceName} fill sizes="(max-width: 640px) 45vw, (max-width: 1000px) 30vw, 235px" /></Link>
          </div>
          <div className={styles.cardCopy}><p className={styles.cardMaterial}>{product.name.startsWith("Soft Leather") ? "Ash · Soft Leather" : "Colour Ash"}</p><h3><Link href={campaignDestination}>{product.name === "Xám" ? c.grey : product.name}</Link></h3><Link className={styles.textLink} href={campaignDestination}>{c.detail}<Arrow /></Link></div>
        </div>)}
      </div>
    </section>
    <section id="moments" className={styles.gallery} aria-labelledby="series-seven-moments">
      <div className={styles.galleryHeading}><h2 id="series-seven-moments">{c.gallery}</h2><p>{c.galleryBody}</p></div>
      <LpeSeriesSevenGallery images={lpeSeriesSevenGallery} imageLabel={c.image} viewLabel={c.view} closeLabel={c.close} />
      <div className={styles.galleryFooter}><Link href={campaignDestination} className={styles.textLink}>{c.visit}<Arrow /></Link></div>
    </section>
    <section className={styles.story} aria-labelledby="series-seven-story">
      <div className={styles.storyPhoto}><Image src={asset("076a5.png")} alt="Đường cong tựa lưng ghế Series 7 Colour Ash đỏ" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
      <div className={styles.storyCopy}>
        <h2 id="series-seven-story">{c.storyTitle.map(line => <span key={line}>{line}</span>)}</h2>
        <p>{c.storyBody}</p>
        <div className={styles.features}>{c.features.map(([title, body], i) => <div key={title}><span className={styles.featureIcon}><Icon file={["07c46.svg", "d0d17.svg", "3a33d.svg"][i]} size={22} /></span><p><strong>{title}</strong><span>{body}</span></p></div>)}</div>
      </div>
    </section>
  </article>;
}
