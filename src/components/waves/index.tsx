/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.css'

export function Waves(){

	return(
		<div className={styles.waves}>
			<svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
  <defs>
    <linearGradient id="gradient" x1="3%" y1="68%" x2="97%" y2="32%">
      <stop offset="5%" stopColor="#8562d6"></stop>
      <stop offset="95%" stopColor="#a990e2"></stop>
    </linearGradient>
  </defs>
  <path d="M 0,400 C 0,400 0,133 0,133 C 75.94258373205744,135.22966507177034 151.8851674641149,137.45933014354068 255,148 C 358.1148325358851,158.54066985645932 488.401913875598,177.39234449760767 582,175 C 675.598086124402,172.60765550239233 732.5071770334929,148.9712918660287 822,134 C 911.4928229665071,119.02870813397128 1033.5693779904307,112.7224880382775 1142,114 C 1250.4306220095693,115.2775119617225 1345.2153110047848,124.13875598086125 1440,133 C 1440,133 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
  <defs>
    <linearGradient id="gradient" x1="3%" y1="68%" x2="97%" y2="32%">
      <stop offset="5%" stopColor="#8562d6"></stop>
      <stop offset="95%" stopColor="#a990e2"></stop>
    </linearGradient>
  </defs>
  <path d="M 0,400 C 0,400 0,266 0,266 C 101.11961722488039,241.20574162679424 202.23923444976077,216.4114832535885 304,231 C 405.7607655502392,245.5885167464115 508.1626794258374,299.55980861244024 600,306 C 691.8373205741626,312.44019138755976 773.1100478468899,271.3492822966507 867,253 C 960.8899521531101,234.6507177033493 1067.3971291866028,239.04306220095694 1165,245 C 1262.6028708133972,250.95693779904306 1351.3014354066986,258.47846889952154 1440,266 C 1440,266 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
</svg>

		</div>
	)
}