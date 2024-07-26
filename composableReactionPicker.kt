@Composable
fun TNTLiveLikeReaction(
    targetGroupId: String,
    targetId: String,
    userReactions: Map<String, UserReaction>,
    onReactionClick: (UserReaction) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        AddReactionIcon(
            modifier = Modifier
                .size(40.dp)
                .clickable(onClick = { /* toggle reaction picker */ })
        )
        UserReactions(
            userReactions = userReactions,
            onReactionClick = onReactionClick
        )
        ReactionPicker(
            targetGroupId = targetGroupId,
            targetId = targetId,
            onReactionClick = onReactionClick
        )
    }
}

@Composable
fun AddReactionIcon(modifier: Modifier = Modifier) {
    Icon(
        imageVector = Icons.Filled.Add,
        contentDescription = "Add reaction",
        modifier = modifier
    )
}

@Composable
fun UserReactions(
    userReactions: Map<String, UserReaction>,
    onReactionClick: (UserReaction) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        userReactions.forEach { (reactionId, userReaction) ->
            UserReactionItem(
                userReaction = userReaction,
                onReactionClick = onReactionClick
            )
        }
    }
}

@Composable
fun UserReactionItem(
    userReaction: UserReaction,
    onReactionClick: (UserReaction) -> Unit
) {
    Column(
        modifier = Modifier
            .width(40.dp)
            .clickable(onClick = { onReactionClick(userReaction) })
    ) {
        Image(
            bitmap = userReaction.imageBitmap,
            contentDescription = userReaction.name
        )
        Text(
            text = userReaction.count.toString(),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun ReactionPicker(
    targetGroupId: String,
    targetId: String,
    onReactionClick: (UserReaction) -> Unit
) {
    // Implement the reaction picker UI and logic here
}