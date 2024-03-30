use anchor_lang::prelude::*;

declare_id!("");

#[program]
pub mod sol_bridge {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn lock_ckb(ctc: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
