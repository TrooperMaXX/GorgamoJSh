// tagEmojiMapper.js

// Mapping-Tabelle von Tags zu Emojis
const tagEmojis = {
	'1225439222421262426': '<:wt_react_Webcam:1084630043407433828> ',
	'1225439309188829296': '<:wt_react_WebcamOptional:1084630085686005850> ',
	'1225439359856021555': '<:wt_react_no_Webcam:1084629995852410910> ',
	'1225439445004587028': '<:wt_react_beginner:1084817126696697977> ',
	'1225439580803829872': '<@&1055576268441141308> <:wt_emote_Cutethulhu:1061780792465956944> ',
	'1225439617042612296': '<@&1055575818442641540> <:wt_RW_DnD:1055593319104786482> ',
	'1225439651850883114': '<@&1190969252526690406> <:wt_RW_Hexxen:1084831374768353360> ',
	'1225439971826208919': '<@&1072230441798606858> <:wt_RW_Pathfinder:1084815694857777212> ',
	'1225440040570589299': '<@&1097429739402166302> <:wt_RW_Warhammer:1084829736385122324> ',
	'1225439704325951590': '<@&1055576465036554371> <:wt_RW_Misc:1055596760103403570> ',
	'1225443552905924711': '**Kampagne** <:wtTime:1055582504754622537> ',
	'1225441251202039870': '<@&1055576630069841921> <:discon_spontan:1084833018268635207> ',
	// Andere Tags und entsprechende Emojis
};

// Funktion zum Erstellen eines Strings mit den entsprechenden Emojis für angewendete Tags
function getAppliedTagsEmojis(appliedTags) {
	const emojis = appliedTags.map(tag => tagEmojis[tag] || '').join('');
	return emojis;
}

// Exportiere die Funktion, damit sie in anderen Dateien verwendet werden kann
module.exports = { getAppliedTagsEmojis };
