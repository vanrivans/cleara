<template>
    <div class="main-footer">
        <div>
            <div class="section-1">
                <p class="title-section-1">juragan material</p>
                <div class="contact">
                    <div class="parent-detail-contact" v-for="(item, i) in detail" v-bind:key="i">
                        <div class="icon">
                            
                        </div>
                        <div class="text">
                            <p class="text-detail">{{ item.name }}</p>
                            <p class="text-value">{{ item.value }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-2">
                <div class="title-section-2">general</div>
                <div class="link-section-2" v-for="(lg, a) in linkGeneral" v-bind:key="lg.id">
                    <p class="item-link-section" :class="a == (linkGeneral.length - 1) ? 'end-link' : ''">{{ lg.name }}</p>
                </div>
                <div class="title-section-2">informasi</div>
                <div class="link-section-2">
                    <p class="item-link-section">FAQ</p>
                    <p class="item-link-section">kemitraan</p>
                </div>
            </div>

            <div class="section-3">
                <div class="title-section-2">ketentuan</div>
                <div class="link-section-2">
                    <p class="item-link-section">syarat & ketentuan</p>
                    <p class="item-link-section">kebijakan privasi</p>
                </div>
            </div>

            <div class="section-4">
                <div class="title-section-2">download juragan material app</div>
                <div class="app-section-4"></div>
                <div class="title-section-2">ikuti kami</div>
                <div class="social">
                    <div class="social-section-4"></div>
                    <div class="social-section-4"></div>
                    <div class="social-section-4"></div>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="copyright">
            <p>© 2011-2021 PT. Juragan Material. All Rights Reserved</p>
        </div>

        <div class="divider mb-3"></div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            detail: [
                {
                    name: 'whatsapp',
                    value: '0812 6222 0021'
                },
                {
                    name: 'call centre',
                    value: '(021) 731 3914'
                },
                {
                    name: 'email',
                    value: 'sales@juraganmaterial.id'
                },
                {
                    name: 'alamat',
                    value: 'Jl. HOS Cokroaminoto No 163, Karang Tengah, Tangerang'
                },
            ],
            linkGeneral: [
                {
                    id: 1,
                    name: 'berita juragan',
                    link: ''
                },
                {
                    id: 2,
                    name: 'tentang kami',
                    link: ''
                },
                {
                    id: 3,
                    name: 'hubungi kami',
                    link: ''
                },
                {
                    id: 4,
                    name: 'karir',
                    link: ''
                },
            ]
        }
    }
}
</script>

<style scoped>
.main-footer {
    padding: 88px 200px 0 200px;
}

.main-footer > div:first-child {
    display: flex;
}

/* section 1 */

.section-1 {
    width: 331px;
    margin-right: 32px;
}

.title-section-1 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
    text-transform: capitalize;
}

.parent-detail-contact {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

.icon {
    width: 40px;
    height: 40px;
    background: #F4F4F4;
    border-radius: 50px;
    margin-right: 24px;
}

.text {
    text-align: left;
}

.text-detail {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #6C6C6C;
    text-transform: capitalize;
    margin-bottom: 4px;
}

.text-value {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #212121;
    margin-bottom: 0;
    width: 201px;
    max-width: 201px;
}

/* section 2 */
.section-2 {
    width: 153px;
}

.title-section-2 {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-transform: capitalize;
    margin-bottom: 24px;
    text-align: left;
}

.item-link-section {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #6C6C6C;
    text-align: left;
    margin-bottom: 8px;
    text-transform: capitalize;
}

.end-link {
    margin-bottom: 40px;
}

/* section 3 */
.section-3 {
    width: 155px;
}

/* section 4 */
.section-4 {
    width: 329px;
}

.app-section-4 {
    width: 188px;
    height: 56px;
    background: #F4F4F4;
    border-radius: 10px;
    margin-bottom: 40px;
}

.social {
    display: flex;
}

.social-section-4 {
    background: #F4F4F4;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    margin-right: 8px;
}

/* copyright */
.copyright {
    text-align: center;
    width: 100%;
}

.copyright > p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #212121;
    margin: 48px 0 80px 0;
}
</style>