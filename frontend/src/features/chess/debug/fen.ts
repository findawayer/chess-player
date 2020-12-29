// ----- Specific board setups as FEN. (Used for debug purposes) ----- //

/** FEN: White is about to checkmate. */
export const FEN_WHITE_CHECKMATE = '4k3/2R5/4K3/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to checkmate. */
export const FEN_BLACK_CHECKMATE = '4K3/2r5/4k3/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to Stalemate. */
export const FEN_WHITE_STALEMATE = '4k3/4P3/3K4/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to Stalemate. */
export const FEN_BLACK_STALEMATE = '4K3/4p3/3k4/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to lose its last checkmate materials */
export const FEN_BLACK_NO_MATERIAL = '4K3/4p3/8/4k3/8/8/8/8 w - - 0 1';
/** FEN: Black is about to lose its last checkmate materials */
export const FEN_WHITE_NO_MATERIAL = '4k3/4P3/8/4K3/8/8/8/8 b - - 0 1';
/** FEN: White is about to make a draw by perpetual repetition. */
export const FEN_WHITE_REPETITION = '6k1/6p1/8/4Q3/8/8/qr6/3K4 w - - 0 1';
/** FEN: Black is about to make a draw by perpetual repetition. */
export const FEN_BLACK_REPETITION = '6K1/6P1/8/4q3/8/8/QR6/3k4 b - - 0 1';
/** FEN: White is about to promote a pawn. */
export const FEN_WHITE_PROMOTION = '5k2/7P/6K1/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to promote a pawn. */
export const FEN_BLACK_PROMOTION = '8/8/8/8/8/6k1/7p/5K2 b - - 0 1';
/** FEN: White is about to capture a black pawn en passant. */
export const FEN_WHITE_EN_PASSANT = '4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1';
/** FEN: Black is about to capture a white pawn en passant. */
export const FEN_BLACK_EN_PASSANT = '4k3/8/8/8/3p4/8/4P3/4K3 w - - 0 1';
