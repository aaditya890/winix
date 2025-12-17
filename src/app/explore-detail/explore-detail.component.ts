import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, KeyValuePipe, NgClass } from '@angular/common';
import { WINIX_SLIDER_ITEMS } from '../../../insight-data';

@Component({
  selector: 'app-explore-detail',
  standalone: true,
  imports: [NgIf, NgFor, KeyValuePipe, NgClass, RouterLink],
  templateUrl: './explore-detail.component.html',
  styleUrl: './explore-detail.component.scss'
})
export class ExploreDetailComponent implements OnInit {
  @ViewChild('thumbsContainer') thumbsContainer!: ElementRef;
  keepOrder = (a: any, b: any): number => 0;
  selectedIndex = 0;
  product: any;
  mainImage: string = '';
  activeTab: string = 'description';
  showVideo = false;
  videoUrl: string = "";

  items = WINIX_SLIDER_ITEMS;
  index = signal(0);

  next() {
    this.index.update(i => (i + 1) % this.items.length);
  }

  go(slug: string) {
    this.router.navigate(['/insight', slug]);
  }


  prev() {
    this.index.update(i => (i - 1 + this.items.length) % this.items.length);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  allProducts = [
    {
      id: 'a231',
      ahemCertificate: null,
      shortTitle: 'WINIX A231',
      name: 'Air Purifier WINIX A231',
      category: 'Air Purifier',
      userManual: 'assets/manuals/a231.pdf',
      image: '/assets/explore-images/A231/product-1.png',
      heroImage: 'assets/explore-images/A231/banner.png',
      url: '/product/winix-a231-air-purifier',
      gallery: [
        '/assets/products-v2/A231/product-1.webp',
        '/assets/products-v2/A231/product-2.webp',
        '/assets/products-v2/A231/product-3.webp',
        '/assets/products-v2/A231/product-4.webp',
        '/assets/products-v2/A231/product-5.webp',
        '/assets/products-v2/A231/product-6.webp',
        '/assets/products-v2/A231/product-7.webp',
        '/assets/products-v2/A231/product-8.webp'
      ],
      aplus: [
        '/assets/winix-product-images/a231/a231-1.webp',
        '/assets/winix-product-images/a231/a231-2.webp',
        '/assets/winix-product-images/a231/a231-3.webp',
        '/assets/winix-product-images/a231/a231-4.webp',
        '/assets/winix-product-images/a231/a231-5.webp'
      ],
      vid: "assets/explore-images/A231/vid.webm",
      shortDescription: `Air purifier WINIX ZERO Compact is a compact and powerful hepa filter air purifier that cleans your indoor air quality for 99.97%. Air Purifier ZERO Compact is the best-air-purifier suitable for your bedroom and home can be used in all rooms up to 50m². With a powerful CADR (Clean Air Delivery Rate) of 250m³ per hour, this room air purifier helps you to purify your indoor air quality from allergies, pollen, dust, dust mites, fine dust (PM2.5), pet hair, mold spores, household odors (VOCs) and cigarette smoke!`,

      longDescription: `Air purifier ZERO Compact is the best air purifier for allergies and uses <span class="text-[#74236C] font-semibold">All-in-One WINIX Filter O</span>, just like the WINIX air purifier T500 WIFI, air purifier A330 and hepa-air purifier A332. Air purifier T500 WIFI filters your indoor air quality through 1) a pre-filter, 2) a carbon filter, 3) a HEPA filter (99.97%) and 4) our WINIX PlasmaWave® Technology. Using smart sensor technology, this hepa air purifier proactively cleans the indoor air and ensures that you breathe clean air as long as you use the air purifier. T500 WIFI with hepa filter has been tested and certified by ECARF and <span class="text-[#74236C] font-semibold">Allergy UK.</span>`,

      tabs: {
        description: [
          "The air purifier ZERO Compact cleans your indoor air quality with the help of a 4-stage filtration system with the help of a a All-in-One filter; 1) pre-filter, 2) active carbon filter, 3) a HEPA filter (99.97%) and 4) WINIX PlasmaWave® technology.",

          "Our Air Purifiers can be used both manually and automatically. In the Auto-Mode, the smart sensor technology automatically measures your indoor air quality. It will adjust the fan speed based on your real-time indoor air quality. The auto-mode of this air purifier helps you to maximize your clean indoor air with a minimized energy consumption. In alternative, you can switch Manually between the 4 different Fan Speed Settings.",

          "During nighttime you can choose to activate the Sleep Mode manually by using the ☾ button. In the sleep mode all lights on the control panel will turn off. The air purifier will continue to clean your indoor air while you and your family can have a restful sleep.",

          "This HEPA Air Purifier is ideal for use in any bedroom, living room bathroom, kitchen, basement or office. The modern and intuitive touch display control panel includes an Air Quality Indicator. This AQI informs You in real-time about your actual indoor air quality through 3 different colors, Blue (good), Orange (medium) or Red (bad)."
        ],

        technology: [
          "PlasmaWave® Technology is the key and differential element of our Air Purifiers. Our technology effectively cleans and eliminates all types of pollutants and is especially useful in reducing viruses and bacteria from your indoor air.",

          "This is one of the reasons why our air purifiers are so effective, because they are not only use HEPA filtration to capture the vast majority of particles that fly through the air. Our air purifiers are combining HEPA filtration with PlasmaWave® Technology which is one of the most powerful filtration systems to clean your indoor quality at your home or your office.",

          "All our Air Purifiers have been Tested and Certified by ECARF (the European Research Center for Allergies), AHAM (American Association of Home Appliance Manufacturers) and Allergy UK. These institutes and their certificates are ensuring you using an Air Purifier which have been tested on Performance and Effectiveness of their filtration system.",

          "Energy consumption and environmental friendliness are of paramount importance at WINIX. That is why our air purifiers have been tested and certified by Energy Star 2.0 and WINIX is using as many recyclable materials as possible in our own WINIX factories in both South Korea and Thailand."
        ],

        advantages: [
          {
            title: "Clean Indoor Air",
            text: "By using our air purifiers, you protect yourself and your family from harmful viruses, allergens and pollutants, and you live in a healthy indoor climate at home or in the office"
          },
          {
            title: "Allergies",
            text: " Using our Air Purifiers can be a solution to reduce allergy symptoms such as Hay Fever caused by dust and pollen. Our air purifiers are helping you to reduce the symptoms from dust allergies, house dust mite allergies, pet allergies from cats, birds and dogs. This air purifier eliminates, filters and removes all allergens that cause an allergic reaction from the air in your home environment."
          },
          {
            title: "Particulate matter",
            text: " Our air purifiers are helping in cleaning your indoor air which is contaminated with particulate matter. With our air cleaners, you can filter and remove harmful particulate matter from your indoor air. People with lung diseases, asthma, COPD and patients who are suffering from dust allergies due to air greatly benefit from reducing the harmful particulate matter in their home environment."
          },
          {
            title: "Bacteria and viruses",
            text: " With a combination of the HEPA Filter and our PlasmaWave® Technology WINIX Air Purifiers are reducing bacteria and viruses (Influenza H3N2) for 99.97% in one hour."
          },
          {
            title: "Cigarette smoke",
            text: "Our air purifiers are filtering almost all pollution from cigarette smoke inside your home environment and reducing the sharp smell of it. As a result, your indoor air quality becomes healthy and clean again."
          },
          {
            title: "VOC’s",
            text: " VOCs in your home indoor environment can cause very unpleasant health risks such as; development of allergies, concentration problems, dizziness, breathing problems, fatigue and headaches. Long-term exposure can cause serious health damage, such as accelerated aging of brain functions. Using our air purifier will help you to filter those VOC’s which are always around in your home indoor environment."
          },
          {
            title: "Mold spores",
            text: " With an air purifier you not only create clean indoor air for you and your family, but you also create an environment in which molds can hardly thrive. Airborne mold spores are removed during our 4-stage filtration process, which also helps You to reduce the musty odors."
          },
          {
            title: "Pet Lovers",
            text: "This air purifier helps reduce allergies in pets and prevents hair and dander from our pets in the air. Relieve your dog allergy, cat allergy or other animal allergy symptoms by purifying your indoor air quality!"
          }
        ],
        specifications: {
          "Model Name": "WINIX A231",
          "Model No.": "AAPU500-JLE",
          "Maximum Room Capacity": "50m²",
          "Max. air flow": "250m³ p/h",
          "Power Consumption": "12–55 Watt",
          "Noise level": "26.5 – 53.7 dB",
          "Product Dimensions (W/D/H)": "241 x 241 x 370 mm",
          "Product Weight": "3.1 kg",
          "Filter Replacement Indicator": "✔",
          "Air Quality Indicator": "Blue / Amber / Red",
          "Particle Sensor": "✔",
          "Gas Sensor": "✘",
          "Fan Speeds": "4",
          "Sleep Mode": "✔",
          "Auto Mode": "✔",
          "Time": "✘",
          "Plasmawave": "✔"
        },

        filter: {
          // title: "WINIX Filter O",
          // subtitle: "is an All-in-One filter set for the HEPA Air Purifier T500 WIFI, ZERO Compact, A330 and A332.",
          details: [
            `Our replacement <span class="text-[#6c2065] font-semibold">Filterset O </span> is an All-in-One filter set for the Air Purifiers <span class="text-[#6c2065] font-semibold"> WINIX A332</span> and ZERO Compact. This filter set includes a pre-filter, a carbon filter and a HEPA filter. To ensure the best performance and the Highest Efficiency of the air purifier, we recommend you to replace your filter set O every 12 months.`,

            "The integrated Filter Change Indicator on the user panel will notify you with a red light, when it is time to change the HEPA filter. With the air purifiers A332 and ZERO Compact, we also recommend you to clean the pre filter every 14 days",

            "When replacing your All-in-One filter set O, we recommend you the following steps:"
          ],
          stepsTitle: "When replacing your All-in-One filter set O, follow these steps:",
          steps: [
            "Turn the air purifier upside down.",
            "Grab the handle at the bottom, turn it clockwise, and remove the cover.",
            "Remove the protective vinyl from the new filter.",
            "Insert the filter inside the air purifier (top side shows the opening).",
            "Turn the handle clockwise to close the cover.",
            "Return purifier upright — ready to clean your indoor air again."
          ],
          note: "After replacing the filter, use a paper clip and press the reset button for 5 seconds.",
          reminder: "To maintain optimal cleaning performance, clean the pre-filter every 14 days."
        }
      },

      additionalInfo: {
        manufacturer: 'Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix',
        packer: 'Sha Maknaji Veerchand, Kamala Nagar, Anantapur. Ph no-08554-356969',
        importer: 'Sha Maknaji Veerchand, Ph no-8885241706'
      }
    },
    {
      id: 't500-wifi',
      ahemCertificate: 'assets/manuals/t500-ahem.pdf',
      shortTitle: 'WINIX T500 WIFI',
      name: 'Air Purifier WINIX T500 WIFI',
      category: 'Air Purifier',
      userManual: 'assets/manuals/t500.pdf',
      image: '/assets/explore-images/T500/product-1.png',
      heroImage: 'assets/explore-images/T500/banner.png',
      url: '/product/winix-t500-air-purifier',
      gallery: [
        '/assets/products-v2/T500/product-1.webp',
        '/assets/products-v2/T500/product-2.webp',
        '/assets/products-v2/T500/product-3.webp',
        '/assets/products-v2/T500/product-4.webp',
        '/assets/products-v2/T500/product-5.webp',
        '/assets/products-v2/T500/product-6.webp',
        '/assets/products-v2/T500/product-7.webp',
        '/assets/products-v2/T500/product-8.webp'
      ],
      aplus: [
        '/assets/winix-product-images/t500/t500-1.webp',
        '/assets/winix-product-images/t500/t500-2.webp',
        '/assets/winix-product-images/t500/t500-3.webp',
        '/assets/winix-product-images/t500/t500-4.webp',
        '/assets/winix-product-images/t500/t500-5.webp',
      ],
      vid: "assets/explore-images/T500/vid.webm",
      shortDescription: 'Air purifier WINIX T500 WIFI is a compact, powerful and smart room air purifier that cleans 99.97% of your indoor air quality. WINIX T500 WIFI hepa filter air purifier is ideal for the bedroom and can be used in all rooms up to 50m². With a powerful CADR (Clean Air Delivery Rate) of 250m³ per hour, this air purifier helps you clean your indoor air quality from allergies, pollen, fine dust,  mirco plastics, house dust mites, particulate matter (PM2.5), pet hair, mold spores, household odors (VOCs) and cigarette smoke! You can operate the Air Purifier WINIX T500 WIFI manually or by using the WINIX Smart App, Google Home or Amazon Alexa.',

      longDescription: `Air purifier T500 WIFI uses All-in-One <span class="text-[#6c2065] font-semibold">WINIX Filter O</span>, just like the WINIX air purifier A330, air purifier A332 and air purifier <span class="text-[#6c2065] font-semibold">ZERO Compact</span> Air purifier T500 WIFI filters your indoor air quality through 1) a pre-filter, 2) a carbon filter, 3) a HEPA filter (99.97%) and 4) our WINIX PlasmaWave® Technology. Using smart sensor technology, this hepa air purifier pro-actively cleans the indoor air and ensures that you breathe clean air as long as you keep using the best-air-purifier. Air Purifier T500 WIFI with hepa filter has been tested and certified by <span class="text-[#6c2065] font-semibold">ECARF</span> and <span class="text-[#6c2065] font-semibold">Allergy UK.</span>`,

      tabs: {
        description: [
          `Air Purifier T500 WIFI is a smart air purifier for bedroom and home that purifies your indoor air quality by 99.97% using a 4-stage filtration system. This air purifier filters the air using the all-in-one <span class="text-[#6c2065] font-semibold">winix filter O:</span> 1) pre-filter, 2) carbon filter, 3) HEPA filter (99.97%), and our WINIX PlasmaWave® Technology.`,

          "This air purifier can be used both manually and fully automatically. In automatic mode, the smart sensor technology automatically measures your indoor air quality. The air purifier adjusts the fan speed based on your real-time air quality. The hepa air purifier T500 automatic’s mode helps you optimize Your air quality with minimal energy consumption. Alternatively, you can use the air purifier manually and switch between the 4 different fan speeds.",

          "During the night, you can choose to use the air purifier in sleep mode by activating the ☾ button. In sleep mode, all lights on the control panel turn off. The air purifier continues to clean your indoor air while you and your family sleep peacefully.",

          "This HEPA air purifier is ideal for use in any bedroom, living room, bathroom, kitchen, basement, or office. The modern and intuitive touch control panel includes an air quality indicator. This AQI (Air Quality Indicator) informs you in real time about the actual indoor air quality using three different colors: blue (good), orange (average), or red (poor)."
        ],

        technology: [
          "PlasmaWave® Technology is the key and differential element of our Air Purifiers. Our technology effectively cleans and eliminates all types of pollutants and is especially useful in reducing viruses and bacteria from your indoor air.",

          "This is one of the reasons why our air purifiers are so effective, because they are not only use HEPA filtration to capture the vast majority of particles that fly through the air. Our air purifiers are combining HEPA filtration with PlasmaWave® Technology which is one of the most powerful filtration systems to clean your indoor quality at your home or your office.",

          `All our Air Purifiers have been Tested and Certified by <span class="text-[#6c2065] font-semibold">ECARF</span> (the European Research Center for Allergies), AHAM (American Association of Home Appliance Manufacturers) and Allergy UK. These institutes and their certificates are ensuring you using an Air Purifier which have been tested on Performance and Effectiveness of their filtration system.`,

          "Energy consumption and environmental friendliness are of paramount importance at WINIX. That is why our air purifiers have been tested and certified by Energy Star 2.0 and WINIX is using as many recyclable materials as possible in our own WINIX factories in both South Korea and Thailand."
        ],

        advantages: [
          {
            title: "Clean Indoor Air",
            text: "By using our air purifiers, you protect yourself and your family from harmful viruses, allergens and pollutants, and you live in a healthy indoor climate at home or in the office"
          },
          {
            title: "Allergies",
            text: " Using our Air Purifiers can be a solution to reduce allergy symptoms such as Hay Fever caused by dust and pollen. Our air purifiers are helping you to reduce the symptoms from dust allergies, house dust mite allergies, pet allergies from cats, birds and dogs. This air purifier eliminates, filters and removes all allergens that cause an allergic reaction from the air in your home environment."
          },
          {
            title: "Particulate matter",
            text: " Our air purifiers are helping in cleaning your indoor air which is contaminated with particulate matter. With our air cleaners, you can filter and remove harmful particulate matter from your indoor air. People with lung diseases, asthma, COPD and patients who are suffering from dust allergies due to air greatly benefit from reducing the harmful particulate matter in their home environment."
          },
          {
            title: "Bacteria and viruses",
            text: " With a combination of the HEPA Filter and our PlasmaWave® Technology WINIX Air Purifiers are reducing bacteria and viruses (Influenza H3N2) for 99.97% in one hour."
          },
          {
            title: "Cigarette smoke",
            text: "Our air purifiers are filtering almost all pollution from cigarette smoke inside your home environment and reducing the sharp smell of it. As a result, your indoor air quality becomes healthy and clean again."
          },
          {
            title: "VOC’s",
            text: " VOCs in your home indoor environment can cause very unpleasant health risks such as; development of allergies, concentration problems, dizziness, breathing problems, fatigue and headaches. Long-term exposure can cause serious health damage, such as accelerated aging of brain functions. Using our air purifier will help you to filter those VOC’s which are always around in your home indoor environment."
          },
          {
            title: "Mold spores",
            text: " With an air purifier you not only create clean indoor air for you and your family, but you also create an environment in which molds can hardly thrive. Airborne mold spores are removed during our 4-stage filtration process, which also helps You to reduce the musty odors."
          },
          {
            title: "Pet Lovers",
            text: "This air purifier helps reduce allergies in pets and prevents hair and dander from our pets in the air. Relieve your dog allergy, cat allergy or other animal allergy symptoms by purifying your indoor air quality!"
          }
        ],

        specifications: {
          "Model Name": "WINIX T500 WIFI",
          "Model No.": "AT5U207-NWE",
          "Maximum Room Capacity": "50m²",
          "CADR": "250m³ p/h",
          "Power Consumption": "12–55 Watt",
          "Noise level": "26.5 – 53.7 dB",
          "Product Dimensions (W/D/H)": "241 x 241 x 370 mm",
          "Product Weight": "3.1 kg",
          "Filter Replacement Indicator": "✔",
          "Air Quality Indicator": "Blue / Amber / Red",
          "Particle Sensor": "✔",
          "Fan Speeds": "4",
          "Sleep Mode": "✔",
          "Auto Mode": "✔",
          "Timer": "✔",
          "Plasmawave": "✔",
          "WINIX Smart App": "✔",
          "Google Home": "✔",
          "Amazon Alexa": "✔"
        },

        filter: {
          // title: "WINIX Filter O",
          // subtitle: "is an All-in-One filter set for the HEPA Air Purifier T500 WIFI, ZERO Compact, A330 and A332.",
          details: [
            `<span class="text-[#6c2065] font-semibold">WINIX Filter O </span> is an All-in-One filter set for the HEPA Air Purifier T500 WIFI, <span class="text-[#6c2065] font-semibold">ZERO Compact</span>, <span class="text-neutral-700 font-semibold">A330</span> and <span class="text-neutral-700 font-semibold">A332</span>. This filter set includes a pre-filter, a carbon filters and a HEPA filter. To ensure the best performance and the Highest Efficiency of the air purifier, we recommend you to replace your filter set O every 12 months.`,

            "The integrated Filter Change Indicator notifies with a red light when it’s time to change the filter.",

            "We recommend cleaning the pre-filter every 14 days."
          ],
          stepsTitle: "When replacing your All-in-One filter set O, follow these steps:",
          steps: [
            "Turn the air purifier upside down.",
            "Grab the handle at the bottom, turn it clockwise, and remove the cover.",
            "Remove the protective vinyl from the new filter.",
            "Insert the filter inside the air purifier (top side shows the opening).",
            "Turn the handle clockwise to close the cover.",
            "Return purifier upright — ready to clean your indoor air again."
          ],
          note: "After replacing the filter, use a paper clip and press the reset button for 5 seconds.",
          reminder: "To maintain optimal cleaning performance, clean the pre-filter every 14 days."
        }
      },
    },
    {
      id: 't800',
      ahemCertificate: 'assets/manuals/t800-ahem.pdf',
      shortTitle: 'WINIX T800 WIFI',
      name: 'Air Purifier WINIX T800 WIFI',
      category: 'Air Purifier',
      userManual: 'assets/manuals/t800.pdf',
      image: '/assets/explore-images/T800/product-1.png',
      heroImage: 'assets/explore-images/T800/banner.png',
      url: '/product/winix-t800-air-purifier',
      gallery: [
        '/assets/products-v2/T800/product-1.webp',
        '/assets/products-v2/T800/product-2.webp',
        '/assets/products-v2/T800/product-3.webp',
        '/assets/products-v2/T800/product-4.webp',
        '/assets/products-v2/T800/product-5.webp',
        '/assets/products-v2/T800/product-6.webp',
        '/assets/products-v2/T800/product-7.webp',
        '/assets/products-v2/T800/product-8.webp'
      ],
      aplus: [
        '/assets/winix-product-images/t800/1.webp',
        '/assets/winix-product-images/t800/2.webp',
        '/assets/winix-product-images/t800/3.webp',
        '/assets/winix-product-images/t800/4.webp',
        '/assets/winix-product-images/t800/6.webp',
      ],
      vid: "assets/explore-images/T800/vid.webm",
      shortDescription: 'Air purifier WINIX T800 WiFi is our newest and most powerful air cleaner for home and bedroom that cleans your indoor air quality by 99.999% with the help of the WINIX Smart App. The WINIX T800 is a fully automatic air filter suitable for all rooms up to 120m². With a powerful CADR (Clean Air Delivery Rate) of 500m³ per hour, this HEPA air cleaner helps you to purify your indoor air quality from allergies, pollen, dust, dust mites, particulate matter (PM2.5), pet hair, mold spores, household odors (VOCs) and cigarette smoke! WINIX T800 can be operated manually as well as through the WINIX Smart App, but also via voice control using Google Home or Amazon Alexa.',

      longDescription: `Air Purifier T800 uses an All-in-One filter GR and filters your indoor air quality through 1) a pre-filter, 2) a carbon filter, 3) a HEPA filter (99.999%) and 4) our WINIX PlasmaWave® Technology. Using digital and smart sensor technology, this air cleaner proactively cleans the indoor air quality and ensures that you breathe clean air for as long as you keep using it. Tested and Certified by Allergy UK!`,

      tabs: {
        description: [
          "Air purifier WINIX T800 WiFi is our newest and most powerful air purifier that filters 99.999% of the indoor air quality using a 4-stage air filter system. This HEPA air purifier filters the air through an All-in-One filter; 1) pre-filter, 2) carbon filter, 3) a HEPA filter (99.999%) and our WINIX PlasmaWave® Technology.",

          "This air purifier can be used both manually and fully automatically, but can also be operated via the WINIX Smart App. In addition, the WINIX T800 can also be operated with your voice using Google Play or Alexa. In automatic mode, the smart and digital sensor fully automatically measures the indoor air quality. The air purifier adjusts the fan speed based on your real-time air quality.",

          "This Air Purifier can be used both manually and automatically. In the Auto-Mode, the smart sensor technology automatically measures your indoor air quality. It will adjust the fan speed of the air purifier based on your real-time indoor air quality. The auto-mode of this air purifier helps you to maximize your clean indoor air with a minimized energy consumption. In alternative, you can switch Manually between the 4 different Fan Speed Settings.",

          "During nighttime and with the help of the light sensor, the air purifier will automatically switch into the whisper quite Sleep mode. You can also choose to activate the Sleep Mode manually by using the ☾ button. In the sleep mode all lights on the control panel will turn off. The air purifier will continue to clean your indoor air while you and your family can have a restful sleep.",

          "This HEPA Air Purifier is ideal for use in any living room, bedroom, bathroom, kitchen, basement or office. The modern and intuitive touch display control panel includes an Air Quality Indicator. This AQI informs You in real-time about your actual indoor air quality through 3 different colors, Blue (good), Orange (medium) or Red (bad)."
        ],

        technology: [
          "PlasmaWave® Technology is the key and differential element of our Air Purifiers. Our technology effectively cleans and eliminates all types of pollutants and is especially useful in reducing viruses and bacteria from your indoor air.",

          "This is one of the reasons why our air purifiers are so effective, because they are not only use HEPA filtration to capture the vast majority of particles that fly through the air. Our air purifiers are combining HEPA filtration with PlasmaWave® Technology which is one of the most powerful filtration systems to clean your indoor quality at your home or your office.",

          "All our Air Purifiers have been Tested and Certified by ECARF (the European Research Center for Allergies), AHAM (American Association of Home Appliance Manufacturers) and Allergy UK. These institutes and their certificates are ensuring you using an Air Purifier which have been tested on Performance and Effectiveness of their filtration system.",

          "Energy consumption and environmental friendliness are of paramount importance at WINIX. That is why our air purifiers have been tested and certified by Energy Star 2.0 and WINIX is using as many recyclable materials as possible in our own WINIX factories in both South Korea and Thailand."
        ],

        advantages: [
          {
            title: "Clean Indoor Air",
            text: "By using our air purifiers, you protect yourself and your family from harmful viruses, allergens and pollutants, and you live in a healthy indoor climate at home or in the office"
          },
          {
            title: "Allergies",
            text: " Using our Air Purifiers can be a solution to reduce allergy symptoms such as Hay Fever caused by dust and pollen. Our air purifiers are helping you to reduce the symptoms from dust allergies, house dust mite allergies, pet allergies from cats, birds and dogs. This air purifier eliminates, filters and removes all allergens that cause an allergic reaction from the air in your home environment."
          },
          {
            title: "Particulate matter",
            text: " Our air purifiers are helping in cleaning your indoor air which is contaminated with particulate matter. With our air cleaners, you can filter and remove harmful particulate matter from your indoor air. People with lung diseases, asthma, COPD and patients who are suffering from dust allergies due to air greatly benefit from reducing the harmful particulate matter in their home environment."
          },
          {
            title: "Bacteria and viruses",
            text: " With a combination of the HEPA Filter and our PlasmaWave® Technology WINIX Air Purifiers are reducing bacteria and viruses (Influenza H3N2) for 99.97% in one hour."
          },
          {
            title: "Cigarette smoke",
            text: "Our air purifiers are filtering almost all pollution from cigarette smoke inside your home environment and reducing the sharp smell of it. As a result, your indoor air quality becomes healthy and clean again."
          },
          {
            title: "VOC’s",
            text: " VOCs in your home indoor environment can cause very unpleasant health risks such as; development of allergies, concentration problems, dizziness, breathing problems, fatigue and headaches. Long-term exposure can cause serious health damage, such as accelerated aging of brain functions. Using our air purifier will help you to filter those VOC’s which are always around in your home indoor environment."
          },
          {
            title: "Mold spores",
            text: " With an air purifier you not only create clean indoor air for you and your family, but you also create an environment in which molds can hardly thrive. Airborne mold spores are removed during our 4-stage filtration process, which also helps You to reduce the musty odors."
          },
          {
            title: "Pet Lovers",
            text: "This air purifier helps reduce allergies in pets and prevents hair and dander from our pets in the air. Relieve your dog allergy, cat allergy or other animal allergy symptoms by purifying your indoor air quality!"
          }
        ],

        specifications: {
          "Model Name": "	WINIX T800 WiFi",
          "Model No.": "AT8U457-NWE",
          "Maximum Room Capacity": "120m²",
          "CADR": "500m³/h",
          "Power Consumption": "2,5-45 Watt",
          "Noise level": "23,2-56,2 dB",
          "Product Dimensions (W/D/H)": "286 x 286 x 518 mm",
          "Product Weight": "4,7 kg",
          "Filter Replacement Indicator": "✔",
          "Air Quality Indicator": "Blue / Green / Amber / Red",
          "Particle Sensor": "✔",
          "Fan Speeds": "5",
          "Sleep Mode": "✔",
          "Auto Mode": "✔",
          "Timer": "✔",
          "Plasmawave": "✔",
          "WINIX Smart App": "✔",
          "Google Home": "✔",
          "Amazon Alexa": "✔"
        },

        filter: {
          // title: "WINIX Filter O",
          // subtitle: "is an All-in-One filter set for the HEPA Air Purifier T500 WIFI, ZERO Compact, A330 and A332.",
          details: [
            `<span class="text-[#6c2065] font-semibold">WINIX Filter GR</span> is an All-in-One filter set for the air purifier WINIX T800 WiFi. This filter set contains a pre-filter, a carbon filter and a HEPA filter (99.999%). To guarantee the best performance and highest efficiency of the air purifier, we recommend replacing the filter once every 12 months.`,

            "The integrated filter change indicator on the user panel or in the WINIX Smart App indicates when it is time to replace the filter set. As with any air purifier, we recommend cleaning the pre-filter every 14 days, for example with a vacuum cleaner. This ensures that the pre-filter does not become clogged and that the entire filter continues to optimally purify the air quality.",

            "When replacing your All-in-one filter set GR, we recommend the following steps:"
          ],
          stepsTitle: "When replacing your All-in-One filter set O, follow these steps:",
          steps: [
            "Turn the air purifier upside down.",
            "Grab the handle at the bottom, turn it clockwise, and remove the cover.",
            "Remove the protective vinyl from the new filter.",
            "Insert the filter inside the air purifier (top side shows the opening).",
            "Turn the handle clockwise to close the cover.",
            "Return purifier upright — ready to clean your indoor air again."
          ],
          note: "After replacing the filter, use a paper clip and press the reset button for 5 seconds.",
          reminder: "To maintain optimal cleaning performance, clean the pre-filter every 14 days."
        }
      },

      additionalInfo: {
        manufacturer: 'Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix',
        packer: 'Sha Maknaji Veerchand, Kamala Nagar, Anantapur. Ph no-08554-356969',
        importer: 'Sha Maknaji Veerchand, Ph no-8885241706'
      }
    }
  ];

  selectImage(i: number) {
    this.selectedIndex = i;
    this.mainImage = this.product.gallery[i];
    this.scrollToThumb();
  }

  /* ---------------- SLIDE LEFT ---------------- */
  slideLeft() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.mainImage = this.product.gallery[this.selectedIndex];
      this.scrollToThumb();
    }
  }

  /* ---------------- SLIDE RIGHT ---------------- */
  slideRight() {
    if (this.selectedIndex < this.product.gallery.length - 1) {
      this.selectedIndex++;
      this.mainImage = this.product.gallery[this.selectedIndex];
      this.scrollToThumb();
    }
  }

  /* ---------------- SCROLL THUMBNAILS ---------------- */
  scrollToThumb() {
    const container = this.thumbsContainer.nativeElement;
    const thumbWidth = 90; // thumbnail width approx
    container.scrollLeft = this.selectedIndex * thumbWidth;
  }

  /* ---------------- RELATED PRODUCTS ---------------- */
  relatedProducts: any[] = [];

  /* ---------------- INIT ---------------- */
  ngOnInit(): void {
    setInterval(() => this.next(), 4000);
    const stateData = history.state;

    if (stateData && stateData.id) {
      this.loadProduct(stateData.id);
    } else {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) this.loadProduct(slug);
    }
  }

  /* ---------------- LOAD PRODUCT ---------------- */
  loadProduct(id: string) {
    this.product = this.allProducts.find(p => p.id === id) || null;

    if (this.product) {
      this.mainImage = this.product.image;
      this.selectedIndex = 0;

      this.relatedProducts = this.allProducts.filter(p => p.id !== id);
    }
  }

  /* ---------------- TABS ---------------- */
  setTab(tab: string) {
    this.activeTab = tab;
  }

  /* ---------------- MAIN IMAGE SET ---------------- */
  setMainImage(img: string) {
    this.mainImage = img;
  }

  /* ---------------- OPEN OTHER PRODUCT ---------------- */
  openDetail(product: any) {
    this.router.navigate(['/explore', product.id], { state: product });
    this.loadProduct(product.id);
  }

  // Open Product Manual
  openManual() {
    if (this.product?.userManual) {
      window.open(this.product.userManual, "_blank");
    }
  }

  // Open AHEM Certificate Pdf
  openAhemCertificate() {
    if (this.product?.ahemCertificate) {
      window.open(this.product.ahemCertificate, "_blank");
    }
  }


  //For PopUp video
  openVideo() {
    this.videoUrl = this.product.vid;
    this.showVideo = true;
  }
  closeVideo() {
    this.showVideo = false;
  }

}
