import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

let possibleNums = [2, 4, 5, 6, 7, 8, 9, 10, 13, 14, 16, 17, 18, 20, 22, 24, 25, 26, 28, 30]

//let allThirty = [{"artist":"Arctic Monkeys","album":"AM","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f579e414e20f40969185e41182d72472.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f579e414e20f40969185e41182d72472.png"},{"artist":"Arctic Monkeys","album":"Whatever People Say I Am, That's What I'm Not","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/053829a0cd6d4d5d95070b1542cb3f96.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/053829a0cd6d4d5d95070b1542cb3f96.png"},{"artist":"Arctic Monkeys","album":"Who the Fuck Are Arctic Monkeys","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5b50b9087aad45b9ba027580b5ebcd89.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5b50b9087aad45b9ba027580b5ebcd89.png"},{"artist":"Arctic Monkeys","album":"Cornerstone","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/ee9ea9956abb4885aa1006a2481ca2db.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/ee9ea9956abb4885aa1006a2481ca2db.png"},{"artist":"Arctic Monkeys","album":"Fluorescent Adolescent","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5d0f664b35a64046c089a8dc6281861b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5d0f664b35a64046c089a8dc6281861b.png"},{"artist":"Arctic Monkeys","album":"Favourite Worst Nightmare","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/705f6109de0143da8050188598fd4781.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/705f6109de0143da8050188598fd4781.png"},{"artist":"Arctic Monkeys","album":"Suck It and See","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/e8faaf58a491491ea00e6d3b7ac5d7db.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/e8faaf58a491491ea00e6d3b7ac5d7db.png"},{"artist":"Arctic Monkeys","album":"My Propeller","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f3b6ddf0b1a9439f8b535166393c7721.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f3b6ddf0b1a9439f8b535166393c7721.png"},{"artist":"Arctic Monkeys","album":"R U Mine?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/e0ecda2bcb5e41a4c1fad665b2c060c7.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/e0ecda2bcb5e41a4c1fad665b2c060c7.png"},{"artist":"Arctic Monkeys","album":"Tranquility Base Hotel & Casino","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c7f6da092ec3fd3bdb02e3ff71c56fea.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c7f6da092ec3fd3bdb02e3ff71c56fea.png"},{"artist":"Arctic Monkeys","album":"Bigger Boys And Stolen Sweethe","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/68b024614b4640b7bdf495e528dfc463.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/68b024614b4640b7bdf495e528dfc463.png"},{"artist":"Arctic Monkeys","album":"Beneath the Boardwalk","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/cd6735f849c5455c8435f5be13298083.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/cd6735f849c5455c8435f5be13298083.png"},{"artist":"Arctic Monkeys","album":"Why'd You Only Call Me When You're High?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/29e5fe7cb94f437d9cde85e443c94425.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/29e5fe7cb94f437d9cde85e443c94425.png"},{"artist":"Arctic Monkeys","album":"Do I Wanna Know?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/12edf61e195044b499f316bf1b54c819.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/12edf61e195044b499f316bf1b54c819.png"},{"artist":"Arctic Monkeys","album":"Humbug","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/70163676ea2e4c44959c3af0f71b30d8.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/70163676ea2e4c44959c3af0f71b30d8.png"},{"artist":"Arctic Monkeys","album":"Black Treacle","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/95bcd5d928004876c877f15274d14afb.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/95bcd5d928004876c877f15274d14afb.png"},{"artist":"Arctic Monkeys","album":"Leave Before the Lights Come On","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/381c036d612c4889a4dc112983de663d.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/381c036d612c4889a4dc112983de663d.png"},{"artist":"Arctic Monkeys","album":"Brianstorm","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c1ac18cd9fe64f70b3e741c8bcf1e2ed.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c1ac18cd9fe64f70b3e741c8bcf1e2ed.png"},{"artist":"Arctic Monkeys","album":"Don't Sit Down 'Cause I've Moved Your Chair","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0d721b2446974ee880eadedff0dfbfc2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0d721b2446974ee880eadedff0dfbfc2.png"},{"artist":"Arctic Monkeys","album":"I Bet You Look Good on the Dancefloor","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/77a0f5c7918844d687ff341978175589.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/77a0f5c7918844d687ff341978175589.png"},{"artist":"Arctic Monkeys","album":"Teddy Picker","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b06badc6e9b39d8728b5aff44a410117.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b06badc6e9b39d8728b5aff44a410117.png"},{"artist":"Arctic Monkeys","album":"The View from the Afternoon","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0854965d96244cc3828f32a3d5ebfc0b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0854965d96244cc3828f32a3d5ebfc0b.png"},{"artist":"Alex Turner","album":"Submarine (original songs)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b530bdbb5e604252c29ede1a1a28503c.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b530bdbb5e604252c29ede1a1a28503c.png"},{"artist":"The Last Shadow Puppets","album":"Everything You've Come To Expect (Deluxe Edition)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b1a37229361202dcaed6e4ab7d8a1df5.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b1a37229361202dcaed6e4ab7d8a1df5.png"},{"artist":"Arctic Monkeys","album":"Matador","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/d0fdb13d6b3f504d480659aca2426487.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/d0fdb13d6b3f504d480659aca2426487.png"},{"artist":"Laura Marling","album":"Alas I Cannot Swim","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/65640421e83e46ab93dd4ea637346c4d.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/65640421e83e46ab93dd4ea637346c4d.png"},{"artist":"Laura Marling","album":"A Creature I Don't Know","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/58cf6a572404409c847042953ad85a12.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/58cf6a572404409c847042953ad85a12.png"},{"artist":"Laura Marling","album":"LUMP","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0f7f7be13188b22418b088aed204c8e2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0f7f7be13188b22418b088aed204c8e2.png"},{"artist":"Laura Marling","album":"Once I Was An Eagle","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/17ba033549ac46728bc8530bdf93a741.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/17ba033549ac46728bc8530bdf93a741.png"},{"artist":"Laura Marling","album":"Short Movie","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/bc3157f691534937c9d29cc4e0636b70.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/bc3157f691534937c9d29cc4e0636b70.png"}]
//let num = 20;

//let blueCollectionOctagon = [{"artist":"The Killers","album":"Hot Fuss","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/d83c5d906703a8c8042285d0902d9cf4.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/d83c5d906703a8c8042285d0902d9cf4.png"},{"artist":"Joni Mitchell","album":"Blue","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0db6a11adf104115c1bb119c1c93a0b5.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0db6a11adf104115c1bb119c1c93a0b5.png"},{"artist":"Drake","album":"Nothing Was the Same","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b41a65ded8e270a7592777de39350926.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b41a65ded8e270a7592777de39350926.png"},{"artist":"Kimbra","album":"Primal Heart","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/4616f9bd328e1ee552094d0fed90b87c.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/4616f9bd328e1ee552094d0fed90b87c.png"},{"artist":"Weezer","album":"Weezer","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/a986774f52c2438fbe38f019812d3896.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/a986774f52c2438fbe38f019812d3896.png"},{"artist":"Modest Mouse","album":"We Were Dead Before The Ship Even Sank","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/82e27947d56a4b12b7f10ec021c1c910.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/82e27947d56a4b12b7f10ec021c1c910.png"},{"artist":"Ed Sheeran","album":"Divide","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5061c7f1d7ad13324e8964f1ce633325.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5061c7f1d7ad13324e8964f1ce633325.png"}];
//let yellowCollectionX = [{"artist":"Jack Johnson","album":"In Between Dreams","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/8b865c05409d4187bff6509d32444fde.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/8b865c05409d4187bff6509d32444fde.png"},{"artist":"Regina Spektor","album":"Begin to Hope (Bonus Track Version)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/1ae665bb11fa4f77911f18be26b91678.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/1ae665bb11fa4f77911f18be26b91678.png"},{"artist":"Coldplay","album":"Yellow","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/646ccd36b0804e34a38ea5df5d9e4e4d.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/646ccd36b0804e34a38ea5df5d9e4e4d.png"},{"artist":"MGMT","album":"Little Dark Age","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/28700d076e5afb3bc0fba47ab8e71975.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/28700d076e5afb3bc0fba47ab8e71975.png"},{"artist":"Muse","album":"Origin of Symmetry","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5a2c98f98f05f457d770bfaf45f7cc8a.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5a2c98f98f05f457d770bfaf45f7cc8a.png"},{"artist":"The Velvet Underground","album":"The Velvet Underground & Nico","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/99088f450ca5eecffdd08995d53bcf8b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/99088f450ca5eecffdd08995d53bcf8b.png"},{"artist":"The Beatles","album":"1","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c287f9f433293ca72d9866fb18b460a5.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c287f9f433293ca72d9866fb18b460a5.png"},{"artist":"The Rolling Stones","album":"No Spare Parts","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c254c05d59cf4d7bcd7defef3c31f647.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c254c05d59cf4d7bcd7defef3c31f647.png"},{"artist":"Bruno Mars","album":"Doo-Wops & Hooligans","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5e470ad646e14e0ace52ca70374aecef.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5e470ad646e14e0ace52ca70374aecef.png"},{"artist":"Radiohead","album":"Pablo Honey","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f78e87f3ecef4a4b81ec7285ae9882c0.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f78e87f3ecef4a4b81ec7285ae9882c0.png"}];
//let redCollectionHeart = [{"artist":"The White Stripes","album":"Elephant","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/4834c1de5bae49f594bd2f2df1f16286.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/4834c1de5bae49f594bd2f2df1f16286.png"},{"artist":"Banks","album":"Goddess (Deluxe)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f168fe63b59774c9626824a73a04fee2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f168fe63b59774c9626824a73a04fee2.png"},{"artist":"Lion Babe","album":"Lion babe EP","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/91be22b662c75d7963e1738e25bb3ebc.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/91be22b662c75d7963e1738e25bb3ebc.png"},{"artist":"Bad Suns","album":"Language & Perspective","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/d93cec1bfa4fae3134f847eb6b13df9f.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/d93cec1bfa4fae3134f847eb6b13df9f.png"},{"artist":"Third Eye Blind","album":"Third Eye Blind","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f1993e45b36772b764495786820152ab.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f1993e45b36772b764495786820152ab.png"},{"artist":"The Strokes","album":"Comedown Machine","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/8244e7fef2dee176249ad3cbe83e7ee5.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/8244e7fef2dee176249ad3cbe83e7ee5.png"},{"artist":"Maroon 5","album":"Songs About Jane","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/bbf019744c23450f80c16a492c6917e0.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/bbf019744c23450f80c16a492c6917e0.png"},{"artist":"Fiona Apple","album":"When The Pawn...","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/efa75e8449164e1fae16d3769ed1f350.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/efa75e8449164e1fae16d3769ed1f350.png"},{"artist":"Feist","album":"Let It Die","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/8c4a76cf67ab45c7985cfd91f69a3d8b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/8c4a76cf67ab45c7985cfd91f69a3d8b.png"},{"artist":"Norah Jones","album":"Not Too Late","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/9333ab22d9a386669eda68f057cb86bc.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/9333ab22d9a386669eda68f057cb86bc.png"}];
//let blackWhiteCollectionX = [{"artist":"Jenny Wilson","album":"Hardships!","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/a3f254db5e294c05929993dc8eb0d12c.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/a3f254db5e294c05929993dc8eb0d12c.png"},{"artist":"Ingrid Michaelson","album":"Lights Out","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/6e359b8e664e4250c2d24cb6af95ef3e.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/6e359b8e664e4250c2d24cb6af95ef3e.png"},{"artist":"Lana Del Rey","album":"Ultraviolence","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/ae3aaae440bfa49dbb6f6b2be4affa05.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/ae3aaae440bfa49dbb6f6b2be4affa05.png"},{"artist":"Patti Smith","album":"Horses","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/8bb507769db340eac0cdf1c10e4adacc.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/8bb507769db340eac0cdf1c10e4adacc.png"},{"artist":"Oh Wonder","album":"Oh Wonder","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/772712e989de2607e2d221b451bab727.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/772712e989de2607e2d221b451bab727.png"},{"artist":"Timber Timbre","album":"Creep On Creepin' On","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/1ce80ce95cf24bc5a30b3b199baf4667.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/1ce80ce95cf24bc5a30b3b199baf4667.png"},{"artist":"The Beatles","album":"White Album","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/14e1e3d0b3a44c738d5ef6047be59e7e.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/14e1e3d0b3a44c738d5ef6047be59e7e.png"},{"artist":"Simon & Garfunkel","album":"Bookends","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b0ce31385dc243dbb08ac107a2458661.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b0ce31385dc243dbb08ac107a2458661.png"},{"artist":"Lorde","album":"Pure Heroine","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/bf9dabcbd7d199f68da2e6a16300d260.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/bf9dabcbd7d199f68da2e6a16300d260.png"},{"artist":"The Beatles","album":"Revolver","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/fafc74a8f45241acc10158be6e2d8270.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/fafc74a8f45241acc10158be6e2d8270.png"},{"artist":"Laura Marling","album":"Once I Was An Eagle","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/17ba033549ac46728bc8530bdf93a741.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/17ba033549ac46728bc8530bdf93a741.png"},{"artist":"Nai Palm","album":"Needle Paw","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/1ac1657b0b351fd6b89100ce360284ce.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/1ac1657b0b351fd6b89100ce360284ce.png"},{"artist":"The Neighbourhood","album":"I Love You.","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/63bd5abec2474e8f9ecff9dd86385e8f.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/63bd5abec2474e8f9ecff9dd86385e8f.png"},{"artist":"Neil Young","album":"Harvest Moon","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/20520278e64046d5c6d77c2bc32ea9a1.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/20520278e64046d5c6d77c2bc32ea9a1.png"},{"artist":"Alexi Murdoch","album":"Time Without Consequence","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/90ecd6a4d2a3447dc45127aa910966c2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/90ecd6a4d2a3447dc45127aa910966c2.png"},{"artist":"Coldplay","album":"A Rush of Blood to the Head","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/3d3d6d2b41544f42b8f750b6abdbd180.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/3d3d6d2b41544f42b8f750b6abdbd180.png"},{"artist":"Taylor Swift","album":"Reputation","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f03b816f35a7172cb49814d73570e137.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f03b816f35a7172cb49814d73570e137.png"},{"artist":"Adele","album":"21","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c894af1e6a735b9bbb2a0312c7719f40.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c894af1e6a735b9bbb2a0312c7719f40.png"},{"artist":"Jason Mraz","album":"We Sing. We Dance. We Steal Things.","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/fe95d43810f94953a96faf2f83336546.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/fe95d43810f94953a96faf2f83336546.png"},{"artist":"Lady Gaga","album":"The Fame Monster","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/82cb4371a53b22a9c69ffe0c24017be3.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/82cb4371a53b22a9c69ffe0c24017be3.png"},{"artist":"The xx","album":"xx","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/696d1b64cd9d44bf85aad10df414e959.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/696d1b64cd9d44bf85aad10df414e959.png"},{"artist":"Arctic Monkeys","album":"AM","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f579e414e20f40969185e41182d72472.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f579e414e20f40969185e41182d72472.png"}];

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: [], //allThirty.slice(0, num),
            shape: "",
            errors: {selection: "", shape: ""},
            albumRange: {min: 2, max: 30},
            rearranged: [],
            dragging: null
        }
        this.albumSelectComponent = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.editing !== prevProps.editing) {
            // If in editing mode, add the submitted selections and shape back into the menu
            if (this.props.editing) {
                this.setState({
                    selections: this.props.selections,
                    shape: this.props.shape
                })
            } else {
                this.setState({
                    selections: [],
                    shape: ""
                })
                this.handleClearError();
            }
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Add user-added album to selections
    handleAddAlbum = (artist, album, thumbnail, cover) => {
        this.setState({
            selections: [...this.state.selections, {artist, album, thumbnail, cover}],
            shape: ""
        })
    }

    // Remove user-deleted album from selections
    handleDeleteAlbum = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
            shape: ""
        })
    }

    // Drag album selection
    handleDragStart = (e) => {
        e.dataTransfer.setData("text", e.target)
        let dragInd = this.state.selections.findIndex(selection => selection.artist === e.target.getAttribute("artist") && selection.album === e.target.getAttribute("album") && selection.thumbnail === e.target.getAttribute("thumbnail"));
        this.setState({
            dragging: dragInd
        })
    }

    // Drop album selection being dragged
    handleDrop = (e) => {
        this.setState({
            selections: this.state.rearranged,
            rearranged: [],
            dragging: null
        })
    }

    // Rearrange selections as albums are dragged over
    handleDragOver = (e) => {
        e.preventDefault();
        let draggedOver = {
            artist: e.target.parentNode.getAttribute("artist"),
            album: e.target.parentNode.getAttribute("album"),
            thumbnail: e.target.parentNode.getAttribute("thumbnail"),
        }
        let draggedOverInd = this.state.selections.findIndex(selection => selection.artist === draggedOver.artist && selection.album === draggedOver.album && selection.thumbnail === draggedOver.thumbnail);
        let newSelections = [...this.state.selections]
        let dragged = newSelections.splice(this.state.dragging, 1)[0]
        newSelections.splice(draggedOverInd, 0, dragged);
        this.setState({
            rearranged: newSelections
        })
    }

    // Store shape user clicks 
    handleSelectShape = (name, active) => {
        this.setState({
            shape: active ? name : "" 
        })
    }

    handleSubmit = () => {
        // Throw error if minimum number of albums have not been selected
        if (this.state.selections.length < this.state.albumRange.min) {
            this.setState({
                errors: {selection: "Please select at least " + this.state.albumRange.min + " albums", shape: ""}
            })
        // Throw error if no collage shape available for selected number of albums 
        } else if (!possibleNums.includes(this.state.selections.length)) {
            this.setState({
                errors: {selection: "", shape: "No collage shape for this number of albums"}
        })
        // Throw error if no shape has been selected
        } else if (!this.state.shape) {
            this.setState({
                errors: {selection: "", shape: "Please select a collage shape"}
            })
        // Submit album selections and shape to the App component, then reset
        } else {
            this.props.submitCollage(this.state.selections, this.state.shape)
            this.setState({
                selections: [],
                shape: "",
                errors: {selection: "", shape: ""}
            })
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Clear error messages
    handleClearError = () => {
        this.setState({
            errors: {selection: "", shape: ""}
        })
    }

    render() {
        // On small screens, hide selection menu if collage is not being created or edited
        let menuDisplay = (this.props.panelToDisplay === "collage") ? "none" : "";
        let menuWidth = (this.props.panelToDisplay === "menu") ? "100%" : "";
        return (
            <section className="menu" style={{display: menuDisplay, width: menuWidth}}>
                <h1>Music Collage</h1>
                <AlbumSelect ref={this.albumSelectComponent} selections={this.state.selections} errors={this.state.errors} albumRange={this.state.albumRange} inputWidth={menuWidth} addAlbum={this.handleAddAlbum} deleteAlbum={this.handleDeleteAlbum} clearError={this.handleClearError} dragStart={this.handleDragStart} dragEnd={this.handleDragEnd} dragOver={this.handleDragOver} drop={this.handleDrop}/>
                <ShapeSelect selectedShape={this.state.shape} numAlbums={this.state.selections.length} shape={this.state.shape} errors={this.state.errors} selectShape={this.handleSelectShape} clearError={this.handleClearError}/>
                <div className="collage-submit">
                    <button id="submit-selections" className="search-submit" onClick={this.handleSubmit}>{this.props.editing ? "Save Edits" : "Collage-ify"}</button>
                    <p className="warning">{(this.state.errors.selection) ? this.state.errors.selection : (this.state.errors.shape) ? this.state.errors.shape : ""}</p>
                </div>
            </section>
        )
    }
}

export default Menu;