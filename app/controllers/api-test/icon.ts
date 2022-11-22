import axios from 'axios'

const data = JSON.stringify({
  name: 'ld-icon',
  icons: [
    {
      // svg: `<svg t="1668497890611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7487" data-darkreader-inline-fill="" width="200" height="200"><path d="M813.176471 60.235294H210.823529c-66.258824 0-120.470588 54.211765-120.470588 120.470588v596.329412c0 66.258824 54.211765 120.470588 120.470588 120.470588h596.329412c66.258824 0 120.470588-54.211765 120.470588-120.470588V180.705882c6.023529-66.258824-48.188235-120.470588-114.447058-120.470588z m-42.164706 566.211765c0 18.070588-18.070588 36.141176-36.141177 36.141176h-240.941176c-12.047059 30.117647-48.188235 54.211765-84.329412 54.211765s-72.282353-24.094118-84.329412-60.235294h-42.164706c-18.070588 0-36.141176-18.070588-36.141176-36.141177s18.070588-36.141176 36.141176-36.141176h36.141177c18.070588-30.117647 48.188235-54.211765 84.329412-54.211765s78.305882 24.094118 90.352941 54.211765h240.941176c24.094118 0 36.141176 18.070588 36.141177 42.164706z m0-283.105883c0 18.070588-18.070588 36.141176-36.141177 36.141177h-36.141176c-18.070588 36.141176-48.188235 54.211765-84.329412 54.211765-36.141176 0-72.282353-24.094118-84.329412-54.211765h-240.941176c-18.070588 0-36.141176-18.070588-36.141177-36.141177s18.070588-36.141176 36.141177-36.141176h240.941176c12.047059-30.117647 48.188235-54.211765 84.329412-54.211765 36.141176 0 72.282353 24.094118 84.329412 54.211765h36.141176c24.094118 0 36.141176 18.070588 36.141177 36.141176z" p-id="7488"></path></svg>`,
      code: 'car',
      unicode: 'e70e',
      symbol:
        '<symbol id="any-graph-icon-bofang" viewBox="0 0 1024 1024"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"  ></path><path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"  ></path></symbol>',
    },
    {
      // svg: `<svg t="1668497890611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7487" data-darkreader-inline-fill="" width="200" height="200"><path d="M813.176471 60.235294H210.823529c-66.258824 0-120.470588 54.211765-120.470588 120.470588v596.329412c0 66.258824 54.211765 120.470588 120.470588 120.470588h596.329412c66.258824 0 120.470588-54.211765 120.470588-120.470588V180.705882c6.023529-66.258824-48.188235-120.470588-114.447058-120.470588z m-42.164706 566.211765c0 18.070588-18.070588 36.141176-36.141177 36.141176h-240.941176c-12.047059 30.117647-48.188235 54.211765-84.329412 54.211765s-72.282353-24.094118-84.329412-60.235294h-42.164706c-18.070588 0-36.141176-18.070588-36.141176-36.141177s18.070588-36.141176 36.141176-36.141176h36.141177c18.070588-30.117647 48.188235-54.211765 84.329412-54.211765s78.305882 24.094118 90.352941 54.211765h240.941176c24.094118 0 36.141176 18.070588 36.141177 42.164706z m0-283.105883c0 18.070588-18.070588 36.141176-36.141177 36.141177h-36.141176c-18.070588 36.141176-48.188235 54.211765-84.329412 54.211765-36.141176 0-72.282353-24.094118-84.329412-54.211765h-240.941176c-18.070588 0-36.141176-18.070588-36.141177-36.141177s18.070588-36.141176 36.141177-36.141176h240.941176c12.047059-30.117647 48.188235-54.211765 84.329412-54.211765 36.141176 0 72.282353 24.094118 84.329412 54.211765h36.141176c24.094118 0 36.141176 18.070588 36.141177 36.141176z" p-id="7488"></path></svg>`,
      code: 'car-2',
      unicode: 'e701',
      symbol:
        '<symbol id="24eeaf66-ece1-4b45-afe3-a65c9fca8c2d" viewBox="0 0 1024 1024"><path d="M793.6 372.736c0-4.096 0.512-7.68 0.512-11.776 0-111.616-90.624-202.24-202.24-202.24-61.44 0-116.224 27.136-153.088 70.656-14.336-4.608-29.184-7.168-45.056-7.168-78.336 0-141.312 63.488-141.312 141.312 0 2.048 0 4.096 0.512 6.144C183.296 373.76 128 431.104 128 501.76s55.296 128 124.416 132.096l510.976 0.512c73.216 0 132.608-59.392 132.608-132.608 0-62.464-43.52-115.2-102.4-129.024" fill="#80AAFF" p-id="980"></path><path d="M570.88 331.264c71.168 71.68 171.008 79.36 222.72 41.472 0-4.096 0.512-7.68 0.512-11.776 0-111.616-90.624-202.24-202.24-202.24-57.344 0-109.056 24.064-145.92 62.464l-7.168 7.68c0 0.512 47.616 17.408 132.096 102.4z" fill="#B3CFFF" p-id="981"></path><path d="M490.496 476.16C318.976 353.28 252.928 369.664 252.928 369.664 183.296 373.76 128 431.104 128 501.76s55.296 128 124.416 132.096l510.976 0.512c73.216 0 132.608-59.392 132.608-132.608 0-29.696-9.728-57.344-26.624-79.36 23.04 92.16-212.992 172.544-378.88 53.76z" fill="#5886FC" p-id="982"></path><path d="M530.432 712.192c-3.072-0.512-43.008 50.688-46.592 68.608-3.584 17.92 8.192 35.328 26.112 38.4 17.92 3.584 35.328-8.192 38.4-26.112 3.584-17.92-14.848-80.384-17.92-80.896zM324.096 670.208c-3.072-0.512-43.008 50.688-46.592 68.608-3.584 17.92 8.192 35.328 26.112 38.4 17.92 3.584 35.328-8.192 38.4-26.112 3.584-17.92-14.848-80.384-17.92-80.896zM368.128 837.12c-2.56 12.8 5.632 25.088 18.432 27.136 12.8 2.56 25.088-5.632 27.136-18.432s-10.24-56.832-12.8-57.344c-2.048 0-30.208 35.84-32.768 48.64zM728.576 670.208c-3.072-0.512-43.008 50.688-46.592 68.608-3.584 17.92 8.192 35.328 26.112 38.4 17.92 3.584 35.328-8.192 38.4-26.112s-14.336-80.384-17.92-80.896zM607.744 821.76c-2.56 12.8 5.632 25.088 18.432 27.136 12.8 2.56 25.088-5.632 27.136-18.432 2.56-12.8-10.24-56.832-12.8-57.344-2.048-0.512-30.208 35.84-32.768 48.64z" fill="#52B0FF" p-id="983"></path></symbol>',
    },
    {
      // svg: `<svg t="1668497890611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7487" data-darkreader-inline-fill="" width="200" height="200"><path d="M813.176471 60.235294H210.823529c-66.258824 0-120.470588 54.211765-120.470588 120.470588v596.329412c0 66.258824 54.211765 120.470588 120.470588 120.470588h596.329412c66.258824 0 120.470588-54.211765 120.470588-120.470588V180.705882c6.023529-66.258824-48.188235-120.470588-114.447058-120.470588z m-42.164706 566.211765c0 18.070588-18.070588 36.141176-36.141177 36.141176h-240.941176c-12.047059 30.117647-48.188235 54.211765-84.329412 54.211765s-72.282353-24.094118-84.329412-60.235294h-42.164706c-18.070588 0-36.141176-18.070588-36.141176-36.141177s18.070588-36.141176 36.141176-36.141176h36.141177c18.070588-30.117647 48.188235-54.211765 84.329412-54.211765s78.305882 24.094118 90.352941 54.211765h240.941176c24.094118 0 36.141176 18.070588 36.141177 42.164706z m0-283.105883c0 18.070588-18.070588 36.141176-36.141177 36.141177h-36.141176c-18.070588 36.141176-48.188235 54.211765-84.329412 54.211765-36.141176 0-72.282353-24.094118-84.329412-54.211765h-240.941176c-18.070588 0-36.141176-18.070588-36.141177-36.141177s18.070588-36.141176 36.141177-36.141176h240.941176c12.047059-30.117647 48.188235-54.211765 84.329412-54.211765 36.141176 0 72.282353 24.094118 84.329412 54.211765h36.141176c24.094118 0 36.141176 18.070588 36.141177 36.141176z" p-id="7488"></path></svg>`,
      code: 'car-3',
      unicode: 'e702',
      symbol:
        '<symbol id="any-graph-icon-daoru" viewBox="0 0 1024 1024"><path d="M726.4 502.4l-44.8-44.8L576 562.56V160H512v402.56L406.4 457.6l-44.8 44.8 182.4 183.04 182.4-183.04z" fill="#333333" ></path><path d="M896 576v320H192V576H128v384h832V576h-64z" fill="#333333" ></path></symbol>',
    },
  ],
})

axios
  .post('http://localhost:6000/icon-server/assets', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => {
    console.log(data.data)
  })
