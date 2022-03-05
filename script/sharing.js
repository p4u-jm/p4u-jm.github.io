const shareFacebook = () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), "_blank");
}

Kakao.init('c462c25f06813a2fa3bafcb3f80c77e1');

const shareKakaoTalk = () => {
    Kakao.Link.sendDefault({
        objectType: 'text',
        text: '공약한판정리 - 기호1번 이재명',
        link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
        },
    })

    gtag('event', '공유선택: 카오톡', {
        'event_category': '공유',
        'event_lavel': `카카오톡`
    })
}

const shareTelegram = () => {
    let url = encodeURIComponent(window.location.href)
    let title = encodeURIComponent("공약한판정리 - 기호1번 이재명")
    window.open("https://telegram.me/share/url?url=" + url + "&text=" + title, "_blank")

    gtag('event', '공유선택: 텔레그램', {
        'event_category': '공유',
        'event_lavel': `텔레그램`
    })
}

const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("주소가 복사되었습니다 : " + window.location.href);

    gtag('event', '공유선택: 주소복사', {
        'event_category': '공유',
        'event_lavel': `주소복사`
    })
}

