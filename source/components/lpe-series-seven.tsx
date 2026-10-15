import Image from "next/image";
import Link from "next/link";
import { ProductCardWishlistButton } from "@/components/catalog/product-card-wishlist-button";
import { lpeSeriesSevenColours, lpeSeriesSevenGallery, lpeSeriesSevenProducts, lpeSeriesSevenDisplayPrice } from "@/lib/content/lpe-series-seven";
import type { Locale } from "@/i18n/routing";
import { getLpeSeriesSevenCopy } from "./lpe-series-seven-copy";
import { LpeSeriesSevenGallery } from "./lpe-series-seven-gallery";
import { LpeSeriesSevenSpaces } from "./lpe-series-seven-spaces";
import { LpeSeriesSevenVideo } from "./lpe-series-seven-video";
import styles from "./lpe-series-seven.module.css";

const campaignDestination = "https://nanohome.vn/products?q=Series+7+ash";
const asset = (file: string) => `/images/campaigns/lpe-series7/${file.replace(/\.png$/, ".webp")}`;
const iconDimensions: Record<string, [number, number]> = {
  "6b301.svg": [31, 30], "5b53b.svg": [20, 30], "53c0c.svg": [30, 30],
  "2d668.svg": [23, 26], "15e0b.svg": [30, 24], "882d4.svg": [28, 27],
  "07c46.svg": [18, 17], "d0d17.svg": [18, 18], "3a33d.svg": [18, 18],
};
function Icon({ file, size = 34 }: { file: string; size?: number }) {
  const [width, height] = iconDimensions[file];
  return <span className={styles.icon} style={{ width: size, height: size }}><Image unoptimized src={asset(file)} alt="" width={width} height={height} /></span>;
}
function Arrow() { return <Image unoptimized src={asset("e3c08.svg")} alt="" width={14} height={12} className={styles.arrow} />; }

export function LpeSeriesSeven({ locale, ended }: { locale: Locale; ended: boolean }) {
  const c = getLpeSeriesSevenCopy(locale);
  const price = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + " ₫";
  return <article className={styles.page} data-testid="lpe-series-seven">
    <section className={styles.videoHero} aria-labelledby="series-seven-title">
      <LpeSeriesSevenVideo locale={locale} explore={c.explore} destination={campaignDestination}>
        <p className={styles.brand}>FRITZ HANSEN</p>
        <h1 id="series-seven-title">Series 7<sup>™</sup></h1>
        <p className={styles.videoSubtitle}>{c.subtitle.map(line => <span key={line}>{line}</span>)}</p>
        <p className={styles.videoIntro}>{c.intro.join(" ")}</p>
      </LpeSeriesSevenVideo>
        <div className={styles.videoOffer}>
          <p>{ended ? c.ended : c.offer}</p>
          {!ended && <><span className={styles.offerUpTo}>UP TO</span><strong>35<span>%</span></strong><p className={styles.videoEligibility}>Series 7 Colour Ash</p><time className={styles.offerDates}>17 — 30.10.2026</time></>}
          <div className={styles.mobileOfferServices}>
            {[1, 0, 2].map(i => <div key={i}><Icon file={["2d668.svg", "15e0b.svg", "882d4.svg"][i]} size={26} /><p><strong>{c.services[i][0]}</strong><span>{c.services[i][1]}</span></p></div>)}
          </div>
          <a className={`${styles.videoCta} ${styles.mobileOfferCta}`} href={campaignDestination}>{c.explore}<span aria-hidden="true">→</span></a>
        </div>
    </section>
    <div className={styles.services}>
      {c.services.map(([title, body], i) => <div key={title}><Icon file={["2d668.svg", "15e0b.svg", "882d4.svg"][i]} size={32} /><p><strong>{title}</strong>{i === 0 ? <time dateTime="2026-10-17">{body}</time> : <span>{body}</span>}</p></div>)}
    </div>
    <section className={styles.colours} aria-labelledby="series-seven-colours">
      <div className={styles.colourHeading}><div><p className={styles.eyebrow}>Series 7 Ash</p><h2 id="series-seven-colours">{c.colours}</h2></div></div>
      <div className={styles.colourRail}>{lpeSeriesSevenColours.map(product => <Link href={campaignDestination} key={product.slug}><div><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 28vw, 15vw" /></div><span>{product.name.toUpperCase()}</span></Link>)}</div>
      <a className={`${styles.productCta} ${styles.colourCta}`} href={campaignDestination}>{c.all}<Arrow /></a>
    </section>
    <LpeSeriesSevenSpaces labels={c.spaces}>
      {["6a702.png", "1cd52.png", "93166.png"].map((file, i) => <a key={file} href={campaignDestination} className={styles.space}>
        <Image src={asset(file)} alt={c.spaces[i]} fill sizes="(max-width: 700px) 84vw, 33vw" /><div className={styles.spaceGradient} /><div className={styles.spaceCaption}><strong>{c.spaces[i]}</strong><span>{["DINING", "LIVING", "DESIGN DETAIL"][i]}</span></div><span className={styles.spaceArrow}><Image unoptimized src={asset("186a2.svg")} alt="" width={20} height={20} /></span>
      </a>)}
    </LpeSeriesSevenSpaces>
    <section id="selection" className={styles.selection} aria-labelledby="series-seven-selection">
      <p className={styles.eyebrow}>SERIES 7 — COLOUR ASH</p><h2 id="series-seven-selection">{c.selection}</h2>
      <div className={styles.products} data-testid="lpe-product-grid">
        {lpeSeriesSevenProducts.map(product => <div className={styles.card} key={product.slug}>
          <div className={styles.cardMedia}>
            {!ended && <span className={styles.badge} title={c.eligibility}>−35%</span>}
            <ProductCardWishlistButton variant="included" label={`${c.save}: ${product.name}`} testId={`lpe-save-${product.slug}`} item={{ name: product.sourceName, slug: product.slug, primaryImage: product.image, brand: { name: "Fritz Hansen", slug: "fritz-hansen" }, classificationText: "Series 7", priceLabel: product.priceLabel, priceValue: product.priceValue, badgeClassName: null, badgeLabel: null, isCartEligible: false }} />
            <Link href={campaignDestination} aria-label={product.sourceName}><Image src={product.image} alt={product.sourceName} fill sizes="(max-width: 640px) 45vw, (max-width: 1000px) 30vw, 235px" /></Link>
          </div>
          <div className={styles.cardCopy}><p className={styles.cardMaterial}>{product.name.startsWith("Soft Leather") ? "Ash · Soft Leather" : "Colour Ash"}</p><h3><Link href={campaignDestination}>{product.name === "Xám" ? c.grey : product.name}</Link></h3><div className={styles.prices} data-testid="campaign-prices">{!ended && <del>{price(product.priceValue)}</del>}<strong>{price(ended ? product.priceValue : lpeSeriesSevenDisplayPrice(product.priceValue))}</strong></div></div>
        </div>)}
      </div>
    </section>
    <section id="moments" className={styles.gallery} aria-labelledby="series-seven-moments">
      <div className={styles.galleryHeading}><h2 id="series-seven-moments">{c.gallery}</h2></div>
      <LpeSeriesSevenGallery images={lpeSeriesSevenGallery} imageLabel={c.image} viewLabel={c.view} closeLabel={c.close} />
      <div className={styles.galleryFooter}><Link href={campaignDestination} className={styles.galleryCta}>{c.visit}<Arrow /></Link></div>
    </section>
    <section className={styles.story} aria-labelledby="series-seven-story">
      <div className={styles.storyPhoto}><Image src={asset("076a5.png")} alt="Đường cong tựa lưng ghế Series 7 Colour Ash đỏ" fill sizes="(max-width: 900px) 90vw, 45vw" /></div>
      <div className={styles.storyCopy}>
        <h2 id="series-seven-story">{c.storyTitle.map(line => <span key={line}>{line}</span>)}</h2>
        <p>{c.storyBody}</p>
        <div className={styles.features}>{c.features.map(([title, body], i) => <div key={title}><span className={styles.featureIcon}><Icon file={["07c46.svg", "d0d17.svg", "3a33d.svg"][i]} size={22} /></span><p><strong>{title}</strong><span>{body}</span></p></div>)}</div>
        <a className={styles.productCta} href={campaignDestination}>{c.all}<Arrow /></a>
      </div>
    </section>
  </article>;
}
